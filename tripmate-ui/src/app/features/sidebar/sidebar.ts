import { Component, inject, input, output, signal } from '@angular/core';
import { ConversationApiService } from '../../core/services/conversation-api';
import { ConversationSummary } from '../../core/interfaces/conversation-interface';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  private conversationService = inject(ConversationApiService);

  activeConversationId = input<number>();
  select = output<number>();
  newChat = output<void>();

  conversations = signal<ConversationSummary[]>([]);
  search = signal('');
  page = signal(1);
  total = signal(0);
  loading = signal(false);

  private searchDebounceTimer?: ReturnType<typeof setTimeout>;
  private readonly pageSize = 20;

  ngOnInit() {
    this.loadData(true);
  }

  loadData(reset: boolean) {
    this.loading.set(true);
    const pageToFetch = reset ? 1 : this.page();

    this.conversationService.listConversations(this.search(), pageToFetch, this.pageSize).subscribe({
      next: (res) => {
        this.conversations.set(reset ? res.data : [...this.conversations(), ...res.data]);
        this.total.set(res.total);
        this.page.set(res.page);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  onSearchInput(value: string) {
    this.search.set(value.trim());

    // debounce: wait 300ms after the user stops typing before hitting the API,
    clearTimeout(this.searchDebounceTimer);
    this.searchDebounceTimer = setTimeout(() => this.loadData(true), 300);
  }

  loadMore() {
    this.page.set(this.page() + 1);
    this.loading.set(false);
  }

  hasMore(): boolean {
    return this.conversations.length < this.total();
  }

  selectConversation(id: number) {
    this.select.emit(id);
  }

  startNewChat() {
    this.newChat.emit();
  }

  timeAgo(dateStr: string): string {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
}

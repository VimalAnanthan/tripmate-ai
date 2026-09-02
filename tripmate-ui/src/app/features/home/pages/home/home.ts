import { Component, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ChatService } from '../../../../core/services/chat.service';
import { ChatMessage } from '../../../../models/chat-message-model';
import { ChatWindow } from '../../components/chat-window/chat-window';
import { ChatInput } from '../../components/chat-input/chat-input';
import { Sidebar } from '../../../sidebar/sidebar';
import { ConversationApiService } from '../../../../core/services/conversation-api';

@Component({
  selector: 'app-home',
  imports: [ChatWindow, ChatInput, Sidebar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private chatService = inject(ChatService);
  private conversationApiService = inject(ConversationApiService);

  messages = signal<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi I am Tripmate AI. Where are you planning to travel today?'
    }
  ]);

  loading = signal(false);
  conversationId = signal<number | undefined>(undefined);

  // called both by ChatInput's (send) output and by suggestion chip clicks
  async sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    this.messages.update(messages => [
      ...messages,
      { role: 'user', content: trimmed }
    ]);

    this.loading.set(true);

    try {
      const response = await firstValueFrom(
        this.chatService.sendMessage(trimmed, this.conversationId())
      );

      this.conversationId.set(response.conversationId);

      this.messages.update(messages => [
        ...messages,
        { role: 'assistant', content: response.answer }
      ]);
    } catch (error: any) {
      console.error('Chat request failed:', error);

      const status = error?.status;
      let fallbackMessage = "Sorry, something went wrong. Please try again.";

      if (status === 503) {
        fallbackMessage = "TripMate AI is temporarily unavailable — the AI service seems to be down. Please try again in a moment.";
      } else if (status === 504) {
        fallbackMessage = "That took too long to answer. Please try again.";
      }

      this.messages.update(messages => [
        ...messages,
        { role: 'assistant', content: fallbackMessage }
      ]);
    } finally {
      this.loading.set(false);
    }
  }

  async onSelectConversation(id: number) {
    this.loading.set(true);
    try {
      const detail = await firstValueFrom(this.conversationApiService.getMessage(id));
      this.conversationId.set(detail.id);
      this.messages.set(detail.messages);
    } catch (error) {
      console.error('Failed to load conversation:', error);
    } finally {
      this.loading.set(false);
    }
  }

  startNewChat() {
    this.conversationId.set(undefined);
    this.messages.set([
      { role: 'assistant', content: 'Hi I am Tripmate AI. Where are you planning to travel today?' }
    ]);
  }
}

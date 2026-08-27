import { Component, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ChatService } from '../../../../core/services/chat.service';
import { ChatMessage } from '../../../../models/chat-message-model';
import { ChatWindow } from '../../components/chat-window/chat-window';
import { ChatInput } from '../../components/chat-input/chat-input';

@Component({
  selector: 'app-home',
  imports: [ChatWindow, ChatInput],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private chatService = inject(ChatService);

  messages = signal<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi I am Tripmate AI. Where are you planning to travel today?'
    }
  ]);

  loading = signal(false);

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
        this.chatService.sendMessage(trimmed)
      );

      this.messages.update(messages => [
        ...messages,
        { role: 'assistant', content: response.answer }
      ]);
    } catch (error) {
      console.error('Chat request failed:', error);

      this.messages.update(messages => [
        ...messages,
        { role: 'assistant', content: "Sorry, I couldn't reach the server. Please try again." }
      ]);
    } finally {
      this.loading.set(false);
    }
  }
}

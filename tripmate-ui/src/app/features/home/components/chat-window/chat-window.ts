import { Component, input } from '@angular/core';
import { ChatMessage } from '../../../../models/chat-message-model';

@Component({
  selector: 'app-chat-window',
  imports: [],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.scss',
})
export class ChatWindow {
  // signal-based inputs: parent (Home) passes messages + loading state down.
  // this component never talks to ChatService directly — it just renders what it's given.
  messages = input<ChatMessage[]>([]);
  loading = input<boolean>(false);
}

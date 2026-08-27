import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  imports: [],
  templateUrl: './chat-input.html',
  styleUrl: './chat-input.scss',
})
export class ChatInput {
text = signal('');

  // signal-based output: emits the trimmed message text when the user sends
  send = output<string>();

  handleSend() {
    const trimmed = this.text().trim();
    if (!trimmed) return;

    this.send.emit(trimmed);
    this.text.set(''); // clear itself after sending
  }
}

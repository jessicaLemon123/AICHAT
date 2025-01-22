import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: false,
})
export class ChatComponent {
  messages: Message[] = [];
  userInput: string = '';

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  constructor(private ngZone: NgZone) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput;
    this.messages.push({ text: userMessage, sender: 'user' });
    this.userInput = '';

    // 模拟 AI 响应
    setTimeout(() => {
      this.ngZone.run(() => {
        this.messages.push({
          text: `AI: You said "${userMessage}"`,
          sender: 'ai',
        });
        this.scrollToBottom();
      });
    }, 1000);
  }

  private scrollToBottom() {
    setTimeout(() => {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    });
  }
}

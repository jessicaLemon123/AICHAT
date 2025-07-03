import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OllamaService } from '../services/ollama.service';
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

  exampleData: any = null;

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  constructor(
    private ngZone: NgZone,
    private apiService: ApiService,
    private ollamaService: OllamaService
  ) {}
  // 调用后端 GET API
  fetchData(): void {
    this.apiService.getExampleData().subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.exampleData = data;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }

  // 调用后端 POST API
  sendData(): void {
    const payload = { message: this.userInput };
    this.apiService.postExampleData(payload).subscribe({
      next: (response) => {
        console.log('Data sent successfully:', response);
      },
      error: (error) => {
        console.error('Error sending data:', error);
      },
    });
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput;
    this.messages.push({ text: userMessage, sender: 'user' });
    this.userInput = '';

    this.ollamaService.generate('llama3', userMessage).subscribe({
      next: (res) => {
        const aiText = res?.response || '';
        this.ngZone.run(() => {
          this.messages.push({ text: aiText, sender: 'ai' });
          this.scrollToBottom();
        });
      },
      error: (error) => {
        console.error('Error calling LLM:', error);
      },
    });
  }

  private scrollToBottom() {
    setTimeout(() => {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    });
  }
}

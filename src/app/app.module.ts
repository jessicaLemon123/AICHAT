import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [AppComponent, ChatComponent],
  imports: [BrowserModule, FormsModule, RouterOutlet],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';

import { ChatService } from '../shared/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('chatInput') chatInput: ElementRef;

  public messages = [];
  public connection;
  public message;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  @HostListener('click')
  public autofocusInput() {
    this.chatInput.nativeElement.focus();
  }
}

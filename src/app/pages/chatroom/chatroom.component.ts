import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  messageControl = new FormControl('');
  userInConvo = null;

  constructor(public authService: AuthService,
              public chatService: ChatService) {
    this.chatService.matchedUser.subscribe(userInConvo => {
      this.userInConvo = userInConvo;
    });
  }

  ngOnInit() {
  }

}

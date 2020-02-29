import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {User} from '../../services/auth.service';
import {ChatService} from '../../services/chat.service';

@Component({
    selector: 'app-chatroom',
    templateUrl: './chatroom.component.html',
    styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

    messageControl = new FormControl('');
    matchedUser: User = null;

    constructor(public chatService: ChatService) {
        this.chatService.matchedUser.subscribe(matchedUser => {
            if (matchedUser !== null && matchedUser.username !== null) {
              this.matchedUser = matchedUser;
            }
        });
    }

    ngOnInit() {
    }

}

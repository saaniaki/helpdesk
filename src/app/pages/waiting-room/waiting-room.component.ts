import {Component, OnInit} from '@angular/core';
import {ChatService, Status} from '../../services/chat.service';
import {AuthService, User} from '../../services/auth.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit {
  public user: User;
  public status: Status;
  public isInQueue = false;

  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {
    this.authService.user.subscribe((user: User) => {
      this.user = user;
    });
    this.chatService.roomStatus.subscribe((status: Status) => {
      this.status = status;
    });
  }

  ngOnInit() {
  }

  queueMe() {
    this.chatService.queueClient();
    this.isInQueue = true;
  }

}

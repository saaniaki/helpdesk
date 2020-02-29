import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AuthService, User} from '../../services/auth.service';
import {ChatService, Status} from '../../services/chat.service';
import {HelpersListComponent} from '../../components/helpers-list/helpers-list.component';
import {MatBottomSheet} from '@angular/material';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  public user: User;
  public status: Status;
  public messageControl = new FormControl('');
  public matchedUser: User = null;

  constructor(
    private authService: AuthService,
    public chatService: ChatService,
    private bottomSheet: MatBottomSheet) {
    this.authService.user.subscribe((user: User) => {
      this.user = user;
    });
    this.chatService.roomStatus.subscribe((status: Status) => {
      this.status = status;
    });
    this.chatService.matchedUser.subscribe(matchedUser => {
      if (matchedUser !== null && matchedUser.username !== null) {
        this.matchedUser = matchedUser;
      }
    });
  }

  openFreeHelpersSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(HelpersListComponent, {
      data: {currentUserName: this.user.username, helpers: this.status.helpers},
    });

    bottomSheetRef.afterDismissed().subscribe(helperUsername => {
      if (helperUsername !== null && helperUsername !== undefined) {
        this.chatService.transferClient(this.matchedUser.username, helperUsername);
      }
    });
  }

  ngOnInit() {
  }

}

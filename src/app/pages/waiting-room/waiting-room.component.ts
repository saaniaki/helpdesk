import {Component, OnInit} from '@angular/core';
import {ChatService, Status} from '../../services/chat.service';
import {AuthService, User} from '../../services/auth.service';
import {MatBottomSheet} from '@angular/material';
import {HelpersListComponent} from '../../components/helpers-list/helpers-list.component';

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
    public chatService: ChatService,
    private bottomSheet: MatBottomSheet
  ) {
    this.authService.user.subscribe((user: User) => {
      this.user = user;
    });
    this.chatService.roomStatus.subscribe((status: Status) => {
      this.status = status;
    });
  }

  openFreeHelpersSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(HelpersListComponent, {
      data: {currentUserName: this.user.username, helpers: this.status.helpers},
    });

    bottomSheetRef.afterDismissed().subscribe(helperUsername => {
      if (helperUsername !== null && helperUsername !== undefined) {
        this.chatService.joinHelper(helperUsername);
      }
    });
  }

  ngOnInit() {
  }

  queueMe() {
    this.chatService.queueClient();
    this.isInQueue = true;
  }

}

import {Component} from '@angular/core';
import {ChatService} from './services/chat.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private chatService: ChatService, // This is needed so Angular initialises WebSocket
    public authService: AuthService
  ) {
  }

}

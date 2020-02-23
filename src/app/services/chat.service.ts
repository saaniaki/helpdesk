import { Injectable } from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Subject} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private matchedUser$ = new Subject<{username: string, socketID: string}>(); // TODO extract as a user with fname and lname
  private canRequestToJoinQueue$ = new Subject<boolean>(); // TODO extract as a user with fname and lname
  public messages = [];

  constructor(private websocketService: WebsocketService, private authService: AuthService) {
    this.authService.authenticated.subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        this.messages = [];
        this.matchedUser$.next(null);
      }
    });
    this.websocketService.addListener('chatReceive', data => {
      this.messages.push(data);
      console.log(this.messages);
    });
    this.websocketService.addListener('partyJoined', data => {
      this.matchedUser$.next(data);
      this.canRequestToJoinQueue$.next(false);
    });
    this.websocketService.addListener('partyLeft', () => {
      this.messages = [];
      this.matchedUser$.next(null);
      this.canRequestToJoinQueue$.next(true);
    });
  }

  get matchedUser(): Subject<{username: string, socketID: string}> {
    return this.matchedUser$;
  }

  get canRequestToJoinQueue(): Subject<boolean> {
    return this.canRequestToJoinQueue$;
  }

  public send(message: string) {
    this.websocketService.emit('chatSend', message);
  }

  public joinQueue() {
    this.websocketService.emit('joinQueue', null);
    this.canRequestToJoinQueue$.next(false);
  }

}

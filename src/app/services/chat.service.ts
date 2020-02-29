import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {AuthService, User} from './auth.service';
import {Router} from "@angular/router";

export interface Status {
  helpers: string[];
  numberOfClientsOnline: number;
  numberOfClientsInQueue: number;
}

export interface Message {
  text: string;
  timestamp: Date;
  from: User;
  to: User;
  isMe: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private matchedUser$ = new BehaviorSubject<User>({
    username: null,
    socketID: null,
    firstName: null,
    lastName: null,
    isClient: false,
    conversation: null
  });
  private roomStatus$ = new BehaviorSubject<Status>({
    helpers: [],
    numberOfClientsOnline: 0,
    numberOfClientsInQueue: 0,
  });
  public messages: Message[] = [];
  public isPartyTyping = new BehaviorSubject<boolean>(false);

  private timeOut;

  constructor(private websocketService: WebsocketService,
              private authService: AuthService,
              private router: Router) {
    this.authService.user.subscribe(user => {
      if (user !== null) {
        this.messages = [];
        this.matchedUser$.next(null);
      }
    });
    this.websocketService.addListener('roomStatus', data => {
      this.roomStatus$.next(data);
    });
    this.websocketService.addListener('otherTyping', data => {
      this.isPartyTyping.next(true);
    });
    this.websocketService.addListener('otherNotTyping', data => {
      this.isPartyTyping.next(false);
    });
    this.websocketService.addListener('receiveMessage', data => {
      this.messages.push(data);
    });
    this.websocketService.addListener('partyJoined', data => {
      this.matchedUser$.next(data);
      this.router.navigate(['chat']);
    });
    this.websocketService.addListener('partyLeft', () => {
      this.messages = [];
      this.matchedUser$.next(null);
      this.router.navigate(['']);
    });
  }

  get matchedUser(): Subject<User> {
    return this.matchedUser$;
  }

  get roomStatus(): Subject<Status> {
    return this.roomStatus$;
  }

  public leave() {
    this.websocketService.emit('leaveConversation', null);
  }

  public isTyping() {
    this.websocketService.emit('isTyping', null);
  }

  public stoppedTyping() {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
        this.websocketService.emit('stoppedTyping', null);
    }, 1000);
  }

  public send(message: string) {
    this.websocketService.emit('sendMessage', message);
  }

  public queueClient() {
    this.websocketService.emit('queueClient', null);
  }

  public pickClient() {
    this.websocketService.emit('pickClient', null);
  }

  public joinHelper(helperUsername: string) {
    this.websocketService.emit('joinHelper', helperUsername);
  }

  public transferClient(clientUsername: string, helperUsername: string) {
    this.websocketService.emit('pickClient', {clientUsername, helperUsername});
  }

}

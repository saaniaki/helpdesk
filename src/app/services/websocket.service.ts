import {Injectable, Injector} from '@angular/core';
import {AuthService} from './auth.service';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private authenticateEmitControl = false;
  private socket: Socket;
  private listeners: { [key: string]: (data: any) => void } = {};

  constructor(private authService: AuthService, private injector: Injector) {
    this.authService.authenticated.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        if (this.socket === undefined) {
          this.socket = injector.get<Socket>(Socket);
          this.socket.on('connect', () => {
            this.socket.emit('authenticate', {token: this.authService.JWT});
            if (!this.authenticateEmitControl) {
              this.socket.on('authenticated', () => this.socketAuthenticated());
              this.socket.on('unauthorized', msg => this.socketUnauthorized(msg));
              this.registerListeners();
              this.authenticateEmitControl = true;
            }
          });
        } else {
          this.socket.connect();
        }
      } else {
        this.socket.disconnect();
      }
    });
  }

  public addListener(event: string, fx: (data: any) => void) {
    this.listeners[event] = fx;
  }

  public removerListener(event: string) {
    delete this.listeners[event];
  }

  public emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  private registerListeners() {
    for (const [event, fx] of Object.entries(this.listeners)) {
      this.socket.on(event, fx);
    }
  }

  private socketAuthenticated() {
    console.log('websocket authenticated');
  }

  private socketUnauthorized(msg) {
    console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
    throw new Error(msg.data.type);
  }

}

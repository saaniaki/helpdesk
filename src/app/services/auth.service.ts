import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Subject} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import * as jwt_decode from 'jwt-decode';

export interface User {
  username: string;
  socketID: string | null;
  firstName: string;
  lastName: string;
  isClient: boolean;
  isInConvo: boolean | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  private user$ = new BehaviorSubject<User>({
    username: null,
    socketID: null,
    firstName: null,
    lastName: null,
    isClient: false,
    isInConvo: null
  });
  private isAuthenticated = false;
  private token;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.token = sessionStorage.getItem('token');
    if (this.token != null) { this.login(); }
  }

  get user(): Subject<User> {
    return this.user$;
  }

  get JWT() {
    return this.token;
  }

  loginAsClient(firstName: string, lastName: string) {
    this.httpClient.post(environment.serverURL + '/login/client',
      {firstName, lastName}).subscribe((response: { token: string }) => {
      this.token = response.token;
      sessionStorage.setItem('token', this.token);
      this.login();
    }, (error) => {
      this.openSnackBar('Could not log in, please report this!');
    });
  }

  loginAsHelper(username: string, password: string) {
    this.httpClient.post(environment.serverURL + '/login/help-desk',
      {username, password}).subscribe((response: { token: string }) => {
      this.token = response.token;
      sessionStorage.setItem('token', this.token);
      this.login();
    }, (error) => {
      this.openSnackBar('Username or password is wrong.');
    });
  }

  private login() {
    this.isAuthenticated = true;
    this.user$.next(jwt_decode(this.token));
    this.router.navigate(['']);
    this.openSnackBar('Welcome to help desk!');
  }

  logout() {
    this.isAuthenticated = false;
    this.token = null;
    sessionStorage.clear();
    this.user$.next(null);
    this.router.navigate(['login']);
    this.openSnackBar('Have a great one buddy ;)');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isAuthenticated) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  private authenticated$ = new Subject<boolean>();
  private isAuthenticated = false;
  private token;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  get authenticated(): Subject<boolean> {
    return this.authenticated$;
  }

  get JWT() {
    return this.token;
  }

  get decodedJWT() {
    return jwt_decode(this.token);
  }

  loginAsClient(firstName: string, lastName: string) {
    this.httpClient.post(environment.serverURL + '/login/client', {firstName, lastName}).subscribe((response: { token: string }) => {
      this.token = response.token;
      this.isAuthenticated = true;
      this.authenticated$.next(true);
      this.router.navigate(['']);
      this.openSnackBar('Welcome to help desk!');
    }, (error) => {
      this.openSnackBar('Could not log in, please report this!');
    });
  }

  loginAsHelper(username: string, password: string) {
    this.httpClient.post(environment.serverURL + '/login/help-desk', {username, password})
      .subscribe((response: { token: string }) => {
        this.token = response.token;
        this.isAuthenticated = true;
        this.authenticated$.next(true);
        this.router.navigate(['']);
        this.openSnackBar('Welcome to help desk!');
      }, (error) => {
        this.openSnackBar('Username or password is wrong.');
      });
  }

  logout() {
    this.isAuthenticated = false;
    this.authenticated$.next(false);
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

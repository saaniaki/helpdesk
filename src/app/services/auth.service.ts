import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  private authenticated$ = new Subject<boolean>();
  private isAuthenticated = false;
  private token;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  get authenticated(): Subject<boolean> {
    return this.authenticated$;
  }

  get JWT() {
    return this.token;
  }

  loginAsClient(firstName: string, lastName: string) {
    this.httpClient.post(environment.serverURL + '/login/client', {firstName, lastName}).subscribe((response: { token: string }) => {
      this.token = response.token;
      this.isAuthenticated = true;
      this.authenticated$.next(true);
      this.router.navigate(['']);
    }, (error) => {
      console.log(error); // TODO show a snack bar
    });
  }

  loginAsHelper(username: string, password: string) {
    this.httpClient.post(environment.serverURL + '/login/help-desk', {username, password})
      .subscribe((response: { token: string }) => {
        this.token = response.token;
        this.isAuthenticated = true;
        this.authenticated$.next(true);
        this.router.navigate(['']);
      }, (error) => {
        console.log(error); // TODO show a snack bar
      });
  }

  logout() {
    this.isAuthenticated = false;
    this.authenticated$.next(false);
    this.router.navigate(['login']);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isAuthenticated) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}

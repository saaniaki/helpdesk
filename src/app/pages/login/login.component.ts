import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  firstNameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  clientForm = new FormGroup({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
  });

  usernameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  helperForm = new FormGroup({
    username: this.usernameControl,
    password: this.passwordControl,
  });

  constructor(public authService: AuthService) {

  }

  ngOnInit() {
  }

  login() {
    console.log('a');
  }

}

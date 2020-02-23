import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { ChatroomComponent } from './pages/chatroom/chatroom.component';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';

const config: SocketIoConfig = { url: environment.serverURL, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatroomComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

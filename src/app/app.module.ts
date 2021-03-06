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
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule, MatListModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { WaitingRoomComponent } from './pages/waiting-room/waiting-room.component';
import { HelpersListComponent } from './components/helpers-list/helpers-list.component';

const config: SocketIoConfig = { url: environment.serverURL, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatroomComponent,
    WaitingRoomComponent,
    HelpersListComponent,
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
    MatChipsModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatListModule,
    MatBadgeModule
  ],
  entryComponents: [
    HelpersListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

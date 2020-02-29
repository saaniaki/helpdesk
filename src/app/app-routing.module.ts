import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatroomComponent} from './pages/chatroom/chatroom.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthService} from './services/auth.service';
import {WaitingRoomComponent} from './pages/waiting-room/waiting-room.component';


const routes: Routes = [
  {path: '', component: WaitingRoomComponent, canActivate: [AuthService]},
  {path: 'login', component: LoginComponent},
  {path: 'chat', component: ChatroomComponent, canActivate: [AuthService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

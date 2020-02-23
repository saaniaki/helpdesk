import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatroomComponent} from './pages/chatroom/chatroom.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthService} from './services/auth.service';


const routes: Routes = [
  {path: '', component: ChatroomComponent, canActivate: [AuthService]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

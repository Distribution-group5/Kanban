import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';

import { CreateuserComponent } from './createuser/createuser.component';


const routes: Routes = [
  { path: 'kanbanboard', component: BoardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createuser', component: CreateuserComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

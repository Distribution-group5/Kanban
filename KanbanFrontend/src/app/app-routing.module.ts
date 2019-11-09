import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { BoardListComponent } from './board-list/board-list.component';


const routes: Routes = [
  /* { path: 'kanbanboard', component: BoardComponent }, */
  { path: 'login', component: LoginComponent },
  { path: 'createuser', component: CreateuserComponent },
  { path: 'myBoards', component: BoardListComponent },
  { path: 'kanbanboard/:BoardID', component: BoardComponent }];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

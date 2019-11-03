import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { TestsiteComponent } from './testsite/testsite.component';
import { CreateuserComponent } from './createuser/createuser.component';


const routes: Routes = [
  { path: 'kanbanboard', component: BoardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestsiteComponent}];
  { path: 'createuser', component: CreateuserComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

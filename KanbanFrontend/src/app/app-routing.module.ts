import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { BoardViewComponent } from './board-view/board-view.component';


const routes: Routes = [
    { path: 'kanbanboard', component: BoardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'boardView', component: BoardViewComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

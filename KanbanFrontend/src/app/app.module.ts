import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { BoardViewComponent } from './board-view/board-view.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    LoginComponent,
    BoardViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

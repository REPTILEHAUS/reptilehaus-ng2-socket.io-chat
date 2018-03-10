import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';

import { ChatService } from './shared/chat.service';

import { ClientRoutingModule } from './app-routing.module';

import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClientRoutingModule,
    RouterModule.forRoot(routes, { useHash: true })

  ],
  providers: [
    ChatService,
    { provide: LocationStrategy, useClass: PathLocationStrategy }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// @angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { MdGridListModule, MdCardModule, MdButtonModule, MdListModule, MdMenuModule, MdToolbarModule, MdSidenavModule } from '@angular/material';

// Services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { PostmanagerService } from './services/postmanager.service';
// Guards
import { AuthGuard } from './guards/auth.guard';
// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FeedComponent } from './components/feed/feed.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './components/post/post.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FeedComponent,
    ProfileComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ValidateService, AuthGuard, AuthService, PostmanagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// @angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
// Modules
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { PostmanagerService } from './services/postmanager.service';
import { ProfilemanagerService } from './services/profilemanager.service';
// Guards
import { AuthGuard } from './guards/auth.guard';
// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FeedComponent } from './components/feed/feed.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './components/post/post.component';

import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FeedComponent,
    ProfileComponent,
    PostComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ValidateService, AuthGuard, AuthService, PostmanagerService, ProfilemanagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// @angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapGrowlModule } from "ngx-bootstrap-growl";
// Services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { PostmanagerService } from './services/postmanager.service';
import { ProfilemanagerService } from './services/profilemanager.service';
import { CommentmanagerService } from './services/commentmanager.service';
import { GrowlmanagerService } from './services/growlmanager.service';
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
import { CommentsectionComponent } from './components/commentsection/commentsection.component';
import { GrowlerComponent } from './components/growler/growler.component';
import { PostcreatorComponent } from './components/postcreator/postcreator.component';
// Pipes
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FeedComponent,
    ProfileComponent,
    PostComponent,
    SignupComponent,
    SigninComponent,
    CommentsectionComponent,
    TruncatePipe,
    GrowlerComponent,
    PostcreatorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapGrowlModule,
    NgbModule.forRoot()
  ],
  providers: [
    ValidateService,
    AuthGuard,
    AuthService,
    PostmanagerService,
    ProfilemanagerService,
    CommentmanagerService,
    GrowlmanagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

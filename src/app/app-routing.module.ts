import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedComponent } from './components/feed/feed.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './components/post/post.component';

const appRoutes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'user/:id', component: ProfileComponent },
  { path: 'post/:id', component: PostComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

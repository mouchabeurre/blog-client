import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostmanagerService } from '../../services/postmanager.service';
import { CommentsectionComponent } from '../commentsection/commentsection.component'
import { AuthService } from '../../services/auth.service';
import { GrowlmanagerService } from '../../services/growlmanager.service';
import { POST } from '../../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  post: POST;

  constructor(
    private postManager: PostmanagerService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private growlmanagerService: GrowlmanagerService
  ) { }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe(params => {
      this.postManager.getPost(params['id']).subscribe(respost => {
        if (respost.success) {
          this.post = respost.post;
          if (this.authService.loggedIn()) {
            this.postManager.getPostVote(params['id']).subscribe(resvote => {
              if (resvote.success) {
                this.post.vote = resvote.vote;
              }
            });
          }
        } else {
          this.growlmanagerService.generateGrowl({ success: false, msg: respost.msg, feedback: 3 });
        }
      });
    });
  }

  upvotePost() {
    if (this.authService.loggedIn()) {
      this.postManager.upvotePost(this.post.shortPostId).subscribe(res => {
        if(res.success){
          this.post.karma += res.vote;
          this.post.vote += res.vote;
        } else {
          this.growlmanagerService.generateGrowl({ success: false, msg: res.msg, feedback: 3 });
        }
      });
    } else {
      this.growlmanagerService.generateGrowl({ success: false, msg: 'Create an account or sign-in to vote', feedback: 1 });
      // this.router.navigate(['/signin']);
    }
  }

  downvotePost() {
    if (this.authService.loggedIn()) {
      this.postManager.downvotePost(this.post.shortPostId).subscribe(res => {
        if(res.success){
          this.post.karma += res.vote;
          this.post.vote += res.vote;
        } else {
          this.growlmanagerService.generateGrowl({ success: false, msg: res.msg, feedback: 3 });
        }
      });
    } else {
      this.growlmanagerService.generateGrowl({ success: false, msg: 'Create an account or sign-in to vote', feedback: 1 });
      // this.router.navigate(['/signin']);
    }
  }

}

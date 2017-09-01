import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostmanagerService } from '../../services/postmanager.service';
import { CommentsectionComponent } from '../commentsection/commentsection.component'
import { AuthService } from '../../services/auth.service';
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
    private AuthService: AuthService
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    this.ActivatedRoute.params.subscribe(params => {
      this.postManager.getPost(params['id']).then(post => {
        this.post = post;
      });
    });
  }

  upvotePost() {
    if (this.AuthService.loggedIn()) {
      this.postManager.upvotePost(this.post.shortPostId).then(res => {
        this.post.karma++ ,
          err => {
            console.log('error occure:', err);
          }
      });
    } else {
      this.router.navigate(['/signin']);
    }
  }

  downvotePost() {
    if (this.AuthService.loggedIn()) {
      this.postManager.downvotePost(this.post.shortPostId).then(res => {
        this.post.karma-- ,
          err => {
            console.log('error occure:', err);
          }
      });
    } else {
      this.router.navigate(['/signin']);
    }
  }
}

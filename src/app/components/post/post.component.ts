import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostmanagerService } from '../../services/postmanager.service';
import { POST } from '../../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: POST;

  constructor(private postManager: PostmanagerService, private ActivatedRoute: ActivatedRoute) { }

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
    this.postManager.upvotePost(this.post.shortPostId).subscribe(res => {
      console.log(res);
    });
  }

  downvotePost() {
    this.postManager.downvotePost(this.post.shortPostId).subscribe(res => {
      console.log(res);
    });
  }
}

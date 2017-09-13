import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostmanagerService } from '../../services/postmanager.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feed: Object[];

  constructor(
    private postManager: PostmanagerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFeed();
  }

  getFeed(): void {
    this.postManager.getPostFeed().then(posts => {
      this.feed = posts;
    });
  }

  onSelectPost(post) {
    this.router.navigate(['/post', post.shortPostId]);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostmanagerService } from '../../services/postmanager.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { TimeagoPipe } from '../../pipes/timeago.pipe'
import { GrowlmanagerService } from '../../services/growlmanager.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feed: Object[];

  constructor(
    private postManager: PostmanagerService,
    private router: Router,
    private growlmanagerService: GrowlmanagerService
  ) { }

  ngOnInit(): void {
    this.postManager.getPostFeed().subscribe(res => {
      if (res.success) {
        this.feed = res.feed;
      } else {
        this.growlmanagerService.generateGrowl({ success: false, msg: res.msg, feedback: 1 });
      }
    });
  }

  onSelectPost(post) {
    this.router.navigate(['/post', post.shortPostId]);
  }

}

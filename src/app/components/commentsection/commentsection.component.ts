import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentmanagerService } from '../../services/commentmanager.service';
import { AuthService } from '../../services/auth.service';
import { COMMENT } from '../../models/comment';

@Component({
  selector: 'app-commentsection',
  templateUrl: './commentsection.component.html',
  styleUrls: ['./commentsection.component.css'],
})
export class CommentsectionComponent implements OnInit {
  @Input() comments: COMMENT[];
  newcomment: string;

  constructor(
    private commentmanager: CommentmanagerService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private AuthService: AuthService
  ) { }

  ngOnInit() {
  }

  onCommentSubmit() {
    if (this.AuthService.loggedIn()) {
      if (this.newcomment.length > 0) {
        this.ActivatedRoute.params.subscribe(params => {
          const content = {
            content: this.newcomment
          }
          this.commentmanager.addComment(content, params['id']).then(res => {
            console.log(res),
              err => {
                console.log('error occurred:', err);
              }
          });
        });
      } else {
        console.log('Try again');
        return false;
      }
    } else {
      this.router.navigate(['/signin']);
    }
  }

}

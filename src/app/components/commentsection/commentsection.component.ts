import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentmanagerService } from '../../services/commentmanager.service';
import { AuthService } from '../../services/auth.service';
import { GrowlmanagerService } from '../../services/growlmanager.service';
import { ValidateService } from '../../services/validate.service';
import { COMMENT } from '../../models/comment';

@Component({
  selector: 'app-commentsection',
  templateUrl: './commentsection.component.html',
  styleUrls: ['./commentsection.component.css'],
})
export class CommentsectionComponent implements OnInit {
  @Input() comments;
  @Input() shortPostId: string;
  upForm: FormGroup;
  canCreateComment: boolean;
  buttonToggleMessage: string;
  votedComments: { id: string, vote: number }[]

  constructor(
    private commentmanager: CommentmanagerService,
    private fb: FormBuilder,
    private validateService: ValidateService,
    private authService: AuthService,
    private growlmanagerService: GrowlmanagerService
  ) {
    this.comments = new Array<COMMENT>();
    this.canCreateComment = false;
  }

  ngOnInit() {
    this.upForm = this.fb.group({
      newcomment: [null, [Validators.required, Validators.maxLength(300)]]
    });
    if (this.authService.loggedIn()) {
      this.commentmanager.getCommentsVote(this.shortPostId).subscribe(res => {
        if (res.success && res.cvotedArray.length > 0) {
          this.votedComments = res.cvotedArray;
          for (let i = 0; i < this.votedComments.length; i++) {
            this.comments.find(comm => comm.shortCommentId === this.votedComments[i].id).vote = this.votedComments[i].vote;
          }
        }
      });
    }
  }

  toggleCommentCreation() {
    if (this.authService.loggedIn()) {
      this.canCreateComment = !this.canCreateComment;
    } else {
      this.growlmanagerService.generateGrowl({ success: false, msg: 'Create an account or sign-in to comment', feedback: 1 });
    }
  }

  onCommentSubmit() {
    if (this.authService.loggedIn()) {
      const content = {
        content: this.upForm.controls.newcomment.value
      }
      this.commentmanager.addComment(content, this.shortPostId).subscribe(res => {
        this.comments.push(res.newComment);
        this.upForm.reset();
      });
    } else {
      this.growlmanagerService.generateGrowl({ success: false, msg: 'Create an account or sign-in to vote comment', feedback: 1 });
    }
  }

  upvoteComment(comment: COMMENT) {
    if (this.authService.loggedIn()) {
      this.commentmanager.upvoteComment(comment.shortCommentId).subscribe(res => {
        if (res.success) {
          this.comments.find(comm => comm.shortCommentId === comment.shortCommentId).karma += res.voted;
          if (this.comments.find(comm => comm.shortCommentId === comment.shortCommentId).vote == undefined) {
            this.comments.find(comm => comm.shortCommentId === comment.shortCommentId).vote = 0;
          }
          this.comments.find(comm => comm.shortCommentId === comment.shortCommentId).vote += res.voted;
        } else {
          this.growlmanagerService.generateGrowl({ success: false, msg: res.msg, feedback: 3 });
        }
      });
    } else {
      this.growlmanagerService.generateGrowl({ success: false, msg: 'Create an account or sign-in to vote comment', feedback: 1 });
    }
  }

  downvoteComment(comment: COMMENT) {
    if (this.authService.loggedIn()) {
      this.commentmanager.downvoteComment(comment.shortCommentId).subscribe(res => {
        if (res.success) {
          this.comments.find(comm => comm.shortCommentId === comment.shortCommentId).karma += res.voted;
          if (this.comments.find(comm => comm.shortCommentId === comment.shortCommentId).vote == undefined) {
            this.comments.find(comm => comm.shortCommentId === comment.shortCommentId).vote = 0;
          }
          this.comments.find(comm => comm.shortCommentId === comment.shortCommentId).vote += res.voted;
        } else {
          this.growlmanagerService.generateGrowl({ success: false, msg: res.msg, feedback: 3 });
        }
      });
    } else {
      this.growlmanagerService.generateGrowl({ success: false, msg: 'Create an account or sign-in to vote comment', feedback: 1 });
    }
  }

}

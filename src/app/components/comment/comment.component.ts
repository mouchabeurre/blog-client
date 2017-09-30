import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentmanagerService } from '../../services/commentmanager.service';
import { GrowlmanagerService } from '../../services/growlmanager.service';
import { CountdownPipe } from '../../pipes/countdown.pipe'
import { TimeagoPipe } from '../../pipes/timeago.pipe'
import { COMMENT } from '../../models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() shortCommentId: string;
  @Input() nestLevel: number;
  maxNestLevel: number;
  comment: COMMENT;
  expand: boolean;
  upForm: FormGroup;
  canCreateReply: boolean;
  maxMsgLength: number;

  constructor(
    private commentmanager: CommentmanagerService,
    private authService: AuthService,
    private fb: FormBuilder,
    private growlmanagerService: GrowlmanagerService
  ) {
    this.expand = false;
    this.canCreateReply = false;
    this.maxNestLevel = 6;
    this.maxMsgLength = 300;
  }

  ngOnInit() {
    this.commentmanager.getComment(this.shortCommentId).subscribe(res => {
      if (res.success) {
        this.comment = res.comment;
      }
      if (this.commentmanager.alreadyVotedComments && this.commentmanager.alreadyVotedComments.length > 0) {
        for (let i = 0; i < this.commentmanager.alreadyVotedComments.length; i++) {
          if (this.comment.shortCommentId === this.commentmanager.alreadyVotedComments[i].id) {
            this.comment.vote = this.commentmanager.alreadyVotedComments[i].vote;
            break;
          }
        }
      }
    });
    this.upForm = this.fb.group({
      newcomment: [null, [Validators.required, Validators.maxLength(this.maxMsgLength)]]
    });
  }

  toggleReplyCreation() {
    if (this.authService.loggedIn()) {
      if (this.nestLevel < this.maxNestLevel) {
        this.canCreateReply = !this.canCreateReply;
      } else {
        this.growlmanagerService.generateGrowl({ success: false, msg: 'Maximum nest level reached!', feedback: 1 });
      }
    } else {
      this.growlmanagerService.generateGrowl({ success: false, msg: 'Create an account or sign-in to comment', feedback: 1 });
    }
  }

  onReplySubmit() {
    if (this.authService.loggedIn()) {
      const content = {
        content: this.upForm.controls.newcomment.value
      }
      this.commentmanager.addReply(content, this.comment.shortPostId, this.comment.shortCommentId).subscribe(res => {
        this.comment.replies.unshift(res.newComment);
        this.upForm.reset();
        this.canCreateReply = false;
        this.expand = true;
      });
    } else {
      this.growlmanagerService.generateGrowl({ success: false, msg: 'Create an account or sign-in to vote comment', feedback: 1 });
    }
  }

  expandcollapse() {
    this.expand = !this.expand;
  }

  upvoteComment() {
    if (this.authService.loggedIn()) {
      this.commentmanager.upvoteComment(this.comment.shortCommentId).subscribe(res => {
        if (res.success) {
          this.comment.karma += res.voted;
          if (this.comment.vote == undefined) {
            this.comment.vote = 0;
          }
          this.comment.vote += res.voted;
          let isAlreadyVoted = false
          for (let i = 0; i < this.commentmanager.alreadyVotedComments.length; i++) {
            if (this.comment.shortCommentId === this.commentmanager.alreadyVotedComments[i].id) {
              this.commentmanager.alreadyVotedComments[i].vote = this.comment.vote;
              isAlreadyVoted = true;
              break;
            }
          }
          if (isAlreadyVoted) {
            this.commentmanager.alreadyVotedComments.push({ id: this.comment.shortCommentId, vote: this.comment.vote });
          }
        } else {
          this.growlmanagerService.generateGrowl({ success: false, msg: res.msg, feedback: 3 });
        }
      });
    } else {
      this.growlmanagerService.generateGrowl({ success: false, msg: 'Create an account or sign-in to vote comment', feedback: 1 });
    }
  }

  downvoteComment() {
    if (this.authService.loggedIn()) {
      this.commentmanager.downvoteComment(this.comment.shortCommentId).subscribe(res => {
        if (res.success) {
          this.comment.karma += res.voted;
          if (this.comment.vote == undefined) {
            this.comment.vote = 0;
          }
          this.comment.vote += res.voted;
          let isAlreadyVoted = false
          for (let i = 0; i < this.commentmanager.alreadyVotedComments.length; i++) {
            if (this.comment.shortCommentId === this.commentmanager.alreadyVotedComments[i].id) {
              this.commentmanager.alreadyVotedComments[i].vote = this.comment.vote;
              isAlreadyVoted = true;
              break;
            }
          }
          if (isAlreadyVoted) {
            this.commentmanager.alreadyVotedComments.push({ id: this.comment.shortCommentId, vote: this.comment.vote });
          }
        } else {
          this.growlmanagerService.generateGrowl({ success: false, msg: res.msg, feedback: 3 });
        }
      });
    } else {
      this.growlmanagerService.generateGrowl({ success: false, msg: 'Create an account or sign-in to vote comment', feedback: 1 });
    }
  }

}

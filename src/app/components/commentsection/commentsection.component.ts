import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentmanagerService } from '../../services/commentmanager.service';
import { AuthService } from '../../services/auth.service';
import { GrowlmanagerService } from '../../services/growlmanager.service';
import { COMMENT } from '../../models/comment';

@Component({
  selector: 'app-commentsection',
  templateUrl: './commentsection.component.html',
  styleUrls: ['./commentsection.component.css'],
})
export class CommentsectionComponent implements OnInit {
  @Input() shortPostId: string;
  rootComments: COMMENT[];
  upForm: FormGroup;
  canCreateComment: boolean;

  constructor(
    private commentmanager: CommentmanagerService,
    private fb: FormBuilder,
    private authService: AuthService,
    private growlmanagerService: GrowlmanagerService
  ) {
    this.commentmanager.shortPostId = this.shortPostId;
    this.canCreateComment = false;
  }

  ngOnInit() {
    this.upForm = this.fb.group({
      newcomment: [null, [Validators.required, Validators.maxLength(300)]]
    });
    this.commentmanager.getRootComments(this.shortPostId).subscribe(res => {
      if(res.success){
        this.rootComments = res.replies;
      }
    });
    if (this.authService.loggedIn()) {
      this.commentmanager.getCommentsVote(this.shortPostId).subscribe(res => {
        if (res.success && res.cvotedArray.length > 0) {
          this.commentmanager.alreadyVotedComments = res.cvotedArray;
        }
      });
    }
  }

  toggleRootCommentCreation() {
    if (this.authService.loggedIn()) {
      this.canCreateComment = !this.canCreateComment;
    } else {
      this.growlmanagerService.generateGrowl({ success: false, msg: 'Create an account or sign-in to comment', feedback: 1 });
    }
  }

  onRootCommentSubmit() {
    if (this.authService.loggedIn()) {
      const loadout = {
        content: this.upForm.controls.newcomment.value
      }
      this.commentmanager.addComment(loadout, this.shortPostId).subscribe(res => {
        this.rootComments.unshift(res.newComment);
        this.upForm.reset();
      });
    } else {
      this.growlmanagerService.generateGrowl({ success: false, msg: 'Create an account or sign-in to vote comment', feedback: 1 });
    }
  }

}

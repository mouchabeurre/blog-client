import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PostcreatormanagerService } from '../../services/postcreatormanager.service';
import { GrowlmanagerService } from '../../services/growlmanager.service';

@Component({
  selector: 'app-postcreator',
  templateUrl: './postcreator.component.html',
  styleUrls: ['./postcreator.component.css'],
  providers: [PostcreatormanagerService]
})
export class PostcreatorComponent implements OnInit {
  upForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private postcreatormanagerService: PostcreatormanagerService,
    private growlmanagerService: GrowlmanagerService
  ) { }

  ngOnInit() {
    this.upForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      image: [null, []],
      postcontent: [null, [Validators.required, Validators.maxLength(2000)]]
    });
  }

  onPostSumbit() {
    const post = {
      title: this.upForm.controls.title.value,
      imageURL: this.upForm.controls.image.value,
      content: this.upForm.controls.postcontent.value
    }

    this.postcreatormanagerService.newpost(post).subscribe(data => {
      if (data.success) {
        this.growlmanagerService.generateGrowl({ success: true, msg: data.msg, feedback: 0 });
        this.router.navigate(['/feed']);
      }
      else {
        this.growlmanagerService.generateGrowl({ success: false, msg: "Failed to submit your post", feedback: 3 });
      }
    });
  }

}

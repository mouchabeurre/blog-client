import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  upForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.upForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z\d]+')]],
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z\d]+')], [this.validateService.usernameAvailable(this.authService)]],
      email: [null, [Validators.required, Validators.email], [this.validateService.emailAvailable(this.authService)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    });
  }

  onRegisterSumbit() {
    const user = {
      name: this.upForm.controls.name.value,
      email: this.upForm.controls.email.value,
      username: this.upForm.controls.username.value,
      password: this.upForm.controls.password.value
    }
    console.log(user);

    // Register user
    // this.authService.registerUser(user).subscribe(data => {
    //   if (data.success) {
    //     console.log('You are now registered and can log in');
    //     this.router.navigate(['/signin']);
    //   }
    //   else {
    //     console.log('Something went wrong');
    //     this.router.navigate(['/signup']);
    //   }
    // });
  }

}

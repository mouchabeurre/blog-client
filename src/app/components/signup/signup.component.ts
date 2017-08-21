import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSumbit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Validate fields
    if (!this.validateService.validateRegister(user)) {
      console.log('Please fill in all the fields');
      return false;
    }

    // Validate email
    if (!this.validateService.validateEmail(user.email)) {
      console.log('Please use a valid email');
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        console.log('You are now registered and can log in');
        this.router.navigate(['/login']);
      }
      else {
        console.log('Something went wrong');
        this.router.navigate(['/signup']);
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LOCALUSER } from '../../models/user'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string;
  isNavbarCollapsed: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.username = this.authService.user.username;
    }
  }

  isLoggedIn(): boolean {
    return this.authService.loggedIn();
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/signin']);
    return false;
  }

}

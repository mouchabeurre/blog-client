import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { GrowlmanagerService } from './growlmanager.service';
import { LOCALUSER } from '../models/user'
import { baseUrl } from '../base-url';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: LOCALUSER;

  constructor(
    private http: Http,
    private growlmanagerService: GrowlmanagerService
  ) {
    this.loadToken();
  }

  checkUsername(username: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${baseUrl}user/username`, { username }, { headers: headers })
      .map(res => res.json());
  }

  checkEmail(email: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${baseUrl}user/email`, { email }, { headers: headers })
      .map(res => res.json());
  }

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${baseUrl}user/register`, user, { headers: headers })
      .map(res => res.json())
      .do(res => this.growlmanagerService.generateGrowl(res))
      .catch((err) => {
        this.growlmanagerService.generateGrowl({ success: false, msg: err, feedback: 3 });
        return err;
      });
  }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${baseUrl}user/authenticate`, user, { headers: headers })
      .map(res => res.json())
      .do(res => this.growlmanagerService.generateGrowl(res))
      .catch((err) => {
        this.growlmanagerService.generateGrowl({ success: false, msg: err, feedback: 3 });
        return err;
      });
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    const user = JSON.parse(localStorage.getItem('user'));
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.growlmanagerService.generateGrowl({ success: true, msg: 'Logged out', feedback: 0 });
  }

}

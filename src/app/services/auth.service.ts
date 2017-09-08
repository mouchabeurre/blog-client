import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { BootstrapAlertType } from "ngx-bootstrap-growl";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { GROWL } from '../models/growl'
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private baseUrl: string;
  authToken: any;
  user: any;
  growls: Subject<GROWL> = new Subject();

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:3000/api/';
    this.loadToken();
  }

  checkUsername(username: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}user/username`, { username }, { headers: headers })
      .map(res => res.json());
  }

  checkEmail(email: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}user/email`, { email }, { headers: headers })
      .map(res => res.json());
  }

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}user/register`, user, { headers: headers })
      .map(res => res.json())
      .do(res => this.growls.next(res));
  }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}user/authenticate`, user, { headers: headers })
      .map(res => res.json())
      .do(res => this.growls.next(res));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.growls.next({ success: true, msg: 'Logged out' });
  }
}

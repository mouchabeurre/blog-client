import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/toPromise';
import { GrowlmanagerService } from './growlmanager.service';
import { POST } from '../models/post';
import { baseUrl } from '../base-url';

@Injectable()
export class PostmanagerService {

  constructor(
    private http: Http,
    private AuthService: AuthService,
    private growlmanagerService: GrowlmanagerService
  ) { }

  getPostFeed() {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${baseUrl}feed`, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.growlmanagerService.generateGrowl({ success: false, msg: err, feedback: 3 });
        return err;
      });
  }

  getPost(id: string) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${baseUrl}post/${id}`, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.growlmanagerService.generateGrowl({ success: false, msg: err, feedback: 3 });
        return err;
      });
  }

  getPostVote(id: string) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    return this.http.get(`${baseUrl}post/${id}/pvote`, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.growlmanagerService.generateGrowl({ success: false, msg: err, feedback: 3 });
        return err;
      });
  }

  upvotePost(id: string) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    return this.http.put(`${baseUrl}post/${id}/upvote`, null, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.growlmanagerService.generateGrowl({ success: false, msg: err, feedback: 3 });
        return err;
      });
  }

  downvotePost(id: string) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    return this.http.put(`${baseUrl}post/${id}/downvote`, null, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.growlmanagerService.generateGrowl({ success: false, msg: err, feedback: 3 });
        return err;
      });
  }

}

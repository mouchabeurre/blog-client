import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/toPromise';
import { POST } from '../models/post';

@Injectable()
export class PostmanagerService {

  constructor(private http: Http, private AuthService: AuthService) { }

  getPostFeed(): Promise<POST[]> {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/feed/', { headers: headers })
      .toPromise()
      .then(response => response.json() as POST[])
      .catch(this.handleError);
  }

  getPost(id: String): Promise<POST> {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/post/' + id, { headers: headers })
      .toPromise()
      .then(response => response.json() as POST)
      .catch(this.handleError);
  }

  upvotePost(id: String) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    console.log(this.AuthService.authToken, headers);
    return this.http.put('http://localhost:3000/api/post/' + id + '/upvote', { headers: headers })
      .map(res => res.json());
  }

  downvotePost(id: String) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    return this.http.put('http://localhost:3000/api/post/' + id + '/downvote', { headers: headers })
      .map(res => res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}

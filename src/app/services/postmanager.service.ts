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

  getPost(id: string): Promise<POST> {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/post/' + id, { headers: headers })
      .toPromise()
      .then(response => response.json() as POST)
      .catch(this.handleError);
  }

  upvotePost(id: string): Promise<{}> {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    return this.http.put('http://localhost:3000/api/post/' + id + '/upvote', null, { headers: headers })
      .toPromise()
      .then(response => response.json() as {})
      .catch(this.handleError);
  }

  downvotePost(id: string): Promise<{}> {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    return this.http.put('http://localhost:3000/api/post/' + id + '/downvote', null, { headers: headers })
      .toPromise()
      .then(response => response.json() as {})
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}

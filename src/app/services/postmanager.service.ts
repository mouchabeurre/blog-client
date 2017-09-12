import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/toPromise';
import { POST } from '../models/post';

@Injectable()
export class PostmanagerService {
  private baseUrl: string;

  constructor(
    private http: Http,
    private AuthService: AuthService
  ) {
    this.baseUrl = 'http://localhost:3000/api/';
  }

  getPostFeed(): Promise<POST[]> {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.baseUrl}feed`, { headers: headers })
      .toPromise()
      .then(response => response.json() as POST[])
      .catch(this.handleError);
  }

  getPost(id: string): Promise<POST> {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.baseUrl}post/${id}`, { headers: headers })
      .toPromise()
      .then(response => response.json() as POST)
      .catch(this.handleError);
  }

  upvotePost(id: string): Promise<{}> {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    return this.http.put(`${this.baseUrl}post/${id}/upvote`, null, { headers: headers })
      .toPromise()
      .then(response => response.json() as {})
      .catch(this.handleError);
  }

  downvotePost(id: string): Promise<{}> {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    return this.http.put(`${this.baseUrl}post/${id}/downvote`, null, { headers: headers })
      .toPromise()
      .then(response => response.json() as {})
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}

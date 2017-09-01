import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

import { COMMENT } from '../models/comment';

@Injectable()
export class CommentmanagerService {

  constructor(private http: Http, private AuthService: AuthService) { }

  addComment(content: Object, id: string): Promise<{}> {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    return this.http.post('http://localhost:3000/api/post/' + id + '/comment', content, { headers: headers })
      .toPromise()
      .then(response => response.json() as {})
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { GrowlmanagerService } from './growlmanager.service';
import 'rxjs/add/operator/map';
import { COMMENT } from '../models/comment';

@Injectable()
export class CommentmanagerService {
  private baseUrl: string;

  constructor(
    private http: Http,
    private AuthService: AuthService,
    private growlmanagerService: GrowlmanagerService
  ) {
    this.baseUrl = 'http://localhost:3000/api/post/';
  }

  addComment(content: Object, id: string) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    return this.http.post(`${this.baseUrl}${id}/comment`, content, { headers: headers })
      .map(res => res.json())
      .do(res => this.growlmanagerService.generateGrowl(res))
      .catch((err) => {
        this.growlmanagerService.generateGrowl({ success: false, msg: err, feedback: 3 });
        return err;
      });
  }

}

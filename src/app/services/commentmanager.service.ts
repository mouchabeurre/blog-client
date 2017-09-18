import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { GrowlmanagerService } from './growlmanager.service';
import 'rxjs/add/operator/map';
import { COMMENT } from '../models/comment';
import { baseUrl } from '../base-url';

@Injectable()
export class CommentmanagerService {

  constructor(
    private http: Http,
    private AuthService: AuthService,
    private growlmanagerService: GrowlmanagerService
  ) { }

  addComment(content: Object, id: string) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    return this.http.post(`${baseUrl}post/${id}/comment`, content, { headers: headers })
      .map(res => res.json())
      .do(res => this.growlmanagerService.generateGrowl(res))
      .catch((err) => {
        this.growlmanagerService.generateGrowl({ success: false, msg: err, feedback: 3 });
        return err;
      });
  }

  getCommentsVote(id: string) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    return this.http.get(`${baseUrl}post/${id}/cvotes`, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.growlmanagerService.generateGrowl({ success: false, msg: err, feedback: 3 });
        return err;
      });
  }

  upvoteComment(id: string) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    return this.http.put(`${baseUrl}comment/${id}/upvote`, null, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.growlmanagerService.generateGrowl({ success: false, msg: err, feedback: 3 });
        return err;
      });
  }

  downvoteComment(id: string) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    return this.http.put(`${baseUrl}comment/${id}/downvote`, null, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.growlmanagerService.generateGrowl({ success: false, msg: err, feedback: 3 });
        return err;
      });
  }

}

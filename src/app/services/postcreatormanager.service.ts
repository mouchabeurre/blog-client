import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { GrowlmanagerService } from './growlmanager.service';
import { baseUrl } from '../base-url';

@Injectable()
export class PostcreatormanagerService {

  constructor(
    private http: Http,
    private AuthService: AuthService,
    private growlmanagerService: GrowlmanagerService
  ) { }

  newpost(post) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    return this.http.post(`${baseUrl}post/submit`, post, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.growlmanagerService.generateGrowl({ success: false, msg: err, feedback: 3 });
        return err;
      });
  }

}

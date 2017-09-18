import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthService } from './auth.service';
import { GrowlmanagerService } from './growlmanager.service';
import { baseUrl } from '../base-url';

import { SELFUSER } from '../models/user';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProfilemanagerService {

  constructor(
    private http: Http,
    private AuthService: AuthService,
    private growlmanagerService: GrowlmanagerService
  ) { }

  getOwnProfile() {
    const headers = new Headers
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    return this.http.get(`${baseUrl}profile`, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.growlmanagerService.generateGrowl({ success: false, msg: err, feedback: 3 });
        return err;
      });
  }

  getProfile(username: string) {
    const headers = new Headers
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${baseUrl}user/${username}`, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.growlmanagerService.generateGrowl({ success: false, msg: err, feedback: 3 });
        return err;
      });
  }

}

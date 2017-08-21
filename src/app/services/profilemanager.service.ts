import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthService } from './auth.service';

import { SELFUSER } from '../models/user';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProfilemanagerService {

  constructor(private http: Http, private AuthService: AuthService) { }

  getProfile(): Promise<SELFUSER> {
    const headers = new Headers
    //this.AuthService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.AuthService.authToken);
    return this.http.get('http://localhost:3000/api/profile/', { headers: headers })
      .toPromise()
      .then(response => response.json() as SELFUSER)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}

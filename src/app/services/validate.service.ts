import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'
import { AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class ValidateService {
  validationTimeout: number = 500;

  constructor() { }

  validateRegister(user) {
    if (user.name === undefined || user.username === undefined || user.email === undefined || user.password === undefined) {
      return false;
    } else {
      return true;
    }
  }

  emailAvailable(authService: AuthService) {
    return (c: AbstractControl): Observable<any> => {
      return c.valueChanges.debounceTime(this.validationTimeout).distinctUntilChanged().switchMap(() => {
        return authService.checkEmail(c.value).map(res => {
          if (!res.success) {
            c.setErrors({ unavailable: true });
            return Observable.of({ unavailable: true });
          } else {
            c.setErrors(null);
            return Observable.of(null);
          }
        });
      });
    }
  }

  usernameAvailable(authService: AuthService) {
    return (c: AbstractControl): Observable<any> => {
      return c.valueChanges.debounceTime(this.validationTimeout).distinctUntilChanged().switchMap(() => {
        return authService.checkUsername(c.value).map(res => {
          if (!res.success) {
            c.setErrors({ unavailable: true });
            return Observable.of({ unavailable: true });
          } else {
            c.setErrors(null);
            return Observable.of(null);
          }
        });
      });
    }
  }
  // no debounce
  // validateUsername(authService: AuthService) {
  //   return (c: FormControl): Promise<any> => {
  //     return new Promise<any>(
  //       (resolve, reject) => {
  //         if (c.value !== undefined && c.value !== null && c.value.length !== 0) {
  //           authService.checkUsername(c.value).subscribe(
  //             (data) => {
  //               console.log(data.success);
  //               if (!data.success) {
  //                 resolve({ "unavailable": true });
  //               } else {
  //                 resolve(null);
  //               }
  //             },
  //             (error) => {
  //               console.log(error);
  //             });
  //         } else {
  //           resolve(null);
  //         }
  //       }
  //     );
  //   }
  // }

}

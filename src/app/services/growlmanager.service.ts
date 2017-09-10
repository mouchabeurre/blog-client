import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { GROWL } from '../models/growl'

@Injectable()
export class GrowlmanagerService {
  growls: Subject<GROWL> = new Subject();

  constructor() { }

  generateGrowl(APIres) {
    this.growls.next(APIres);
  }

}

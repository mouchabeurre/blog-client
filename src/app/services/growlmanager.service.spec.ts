import { TestBed, inject } from '@angular/core/testing';

import { GrowlmanagerService } from './growlmanager.service';

describe('GrowlmanagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrowlmanagerService]
    });
  });

  it('should be created', inject([GrowlmanagerService], (service: GrowlmanagerService) => {
    expect(service).toBeTruthy();
  }));
});

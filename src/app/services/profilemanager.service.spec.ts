import { TestBed, inject } from '@angular/core/testing';

import { ProfilemanagerService } from './profilemanager.service';

describe('ProfilemanagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfilemanagerService]
    });
  });

  it('should be created', inject([ProfilemanagerService], (service: ProfilemanagerService) => {
    expect(service).toBeTruthy();
  }));
});

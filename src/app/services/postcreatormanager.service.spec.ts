import { TestBed, inject } from '@angular/core/testing';

import { PostcreatormanagerService } from './postcreatormanager.service';

describe('PostcreatormanagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostcreatormanagerService]
    });
  });

  it('should be created', inject([PostcreatormanagerService], (service: PostcreatormanagerService) => {
    expect(service).toBeTruthy();
  }));
});

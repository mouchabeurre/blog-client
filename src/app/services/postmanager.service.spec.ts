import { TestBed, inject } from '@angular/core/testing';

import { PostmanagerService } from './postmanager.service';

describe('PostmanagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostmanagerService]
    });
  });

  it('should be created', inject([PostmanagerService], (service: PostmanagerService) => {
    expect(service).toBeTruthy();
  }));
});

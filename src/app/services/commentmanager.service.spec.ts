import { TestBed, inject } from '@angular/core/testing';

import { CommentmanagerService } from './commentmanager.service';

describe('CommentmanagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentmanagerService]
    });
  });

  it('should be created', inject([CommentmanagerService], (service: CommentmanagerService) => {
    expect(service).toBeTruthy();
  }));
});

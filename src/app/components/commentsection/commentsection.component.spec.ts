import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsectionComponent } from './commentsection.component';

describe('CommentsectionComponent', () => {
  let component: CommentsectionComponent;
  let fixture: ComponentFixture<CommentsectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

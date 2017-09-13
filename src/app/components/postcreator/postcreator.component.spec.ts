import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcreatorComponent } from './postcreator.component';

describe('PostcreatorComponent', () => {
  let component: PostcreatorComponent;
  let fixture: ComponentFixture<PostcreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostcreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostcreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

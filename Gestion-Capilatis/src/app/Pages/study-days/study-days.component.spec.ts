import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyDaysComponent } from './study-days.component';

describe('StudyDaysComponent', () => {
  let component: StudyDaysComponent;
  let fixture: ComponentFixture<StudyDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

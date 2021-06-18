import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyDataComponent } from './study-data.component';

describe('StudyDataComponent', () => {
  let component: StudyDataComponent;
  let fixture: ComponentFixture<StudyDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

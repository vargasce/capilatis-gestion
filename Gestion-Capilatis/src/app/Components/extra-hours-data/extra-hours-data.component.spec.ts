import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraHoursDataComponent } from './extra-hours-data.component';

describe('ExtraHoursDataComponent', () => {
  let component: ExtraHoursDataComponent;
  let fixture: ComponentFixture<ExtraHoursDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraHoursDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraHoursDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

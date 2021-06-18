import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensesDataComponent } from './licenses-data.component';

describe('LicensesDataComponent', () => {
  let component: LicensesDataComponent;
  let fixture: ComponentFixture<LicensesDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensesDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassAcceptanceComponent } from './mass-acceptance.component';

describe('MassAcceptanceComponent', () => {
  let component: MassAcceptanceComponent;
  let fixture: ComponentFixture<MassAcceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassAcceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

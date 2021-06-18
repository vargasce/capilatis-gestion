import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenteeismDataComponent } from './presenteeism-data.component';

describe('PresenteeismDataComponent', () => {
  let component: PresenteeismDataComponent;
  let fixture: ComponentFixture<PresenteeismDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresenteeismDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenteeismDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

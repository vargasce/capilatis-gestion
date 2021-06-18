import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenteeismComponent } from './presenteeism.component';

describe('PresenteeismComponent', () => {
  let component: PresenteeismComponent;
  let fixture: ComponentFixture<PresenteeismComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresenteeismComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenteeismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardDataComponent } from './award-data.component';

describe('AwardDataComponent', () => {
  let component: AwardDataComponent;
  let fixture: ComponentFixture<AwardDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

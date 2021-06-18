import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysofleaveNewsComponent } from './daysofleave-news.component';

describe('DaysofleaveNewsComponent', () => {
  let component: DaysofleaveNewsComponent;
  let fixture: ComponentFixture<DaysofleaveNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaysofleaveNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysofleaveNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

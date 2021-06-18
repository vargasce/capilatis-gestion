import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPeriodCustomComponent } from './search-period-custom.component';

describe('SearchPeriodCustomComponent', () => {
  let component: SearchPeriodCustomComponent;
  let fixture: ComponentFixture<SearchPeriodCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPeriodCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPeriodCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

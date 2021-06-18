import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbyemployeeNewsComponent } from './searchbyemployee-news.component';

describe('SearchbyemployeeNewsComponent', () => {
  let component: SearchbyemployeeNewsComponent;
  let fixture: ComponentFixture<SearchbyemployeeNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchbyemployeeNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbyemployeeNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

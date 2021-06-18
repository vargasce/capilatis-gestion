import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbyperiodNewsComponent } from './searchbyperiod-news.component';

describe('SearchbyperiodNewsComponent', () => {
  let component: SearchbyperiodNewsComponent;
  let fixture: ComponentFixture<SearchbyperiodNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchbyperiodNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbyperiodNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

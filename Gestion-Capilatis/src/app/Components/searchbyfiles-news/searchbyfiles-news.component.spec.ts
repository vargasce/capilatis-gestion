import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbyfilesNewsComponent } from './searchbyfiles-news.component';

describe('SearchbyfilesNewsComponent', () => {
  let component: SearchbyfilesNewsComponent;
  let fixture: ComponentFixture<SearchbyfilesNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchbyfilesNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbyfilesNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

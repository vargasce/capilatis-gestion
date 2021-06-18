import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbyempSectorGroupNewsComponent } from './searchbyemp-sector-group-news.component';

describe('SearchbyempSectorGroupNewsComponent', () => {
  let component: SearchbyempSectorGroupNewsComponent;
  let fixture: ComponentFixture<SearchbyempSectorGroupNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchbyempSectorGroupNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbyempSectorGroupNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

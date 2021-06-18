import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadNewsComponent } from './load-news.component';

describe('LoadNewsComponent', () => {
  let component: LoadNewsComponent;
  let fixture: ComponentFixture<LoadNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

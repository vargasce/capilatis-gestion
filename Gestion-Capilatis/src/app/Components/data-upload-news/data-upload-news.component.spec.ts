import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUploadNewsComponent } from './data-upload-news.component';

describe('DataUploadNewsComponent', () => {
  let component: DataUploadNewsComponent;
  let fixture: ComponentFixture<DataUploadNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataUploadNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataUploadNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorDataComponent } from './administrator-data.component';

describe('AdministratorDataComponent', () => {
  let component: AdministratorDataComponent;
  let fixture: ComponentFixture<AdministratorDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPageTopComponent } from './category-page-top.component';

describe('CategoryPageTopComponent', () => {
  let component: CategoryPageTopComponent;
  let fixture: ComponentFixture<CategoryPageTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryPageTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPageTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

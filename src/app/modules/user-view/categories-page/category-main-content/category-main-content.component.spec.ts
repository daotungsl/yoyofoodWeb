import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMainContentComponent } from './category-main-content.component';

describe('CategoryMainContentComponent', () => {
  let component: CategoryMainContentComponent;
  let fixture: ComponentFixture<CategoryMainContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryMainContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

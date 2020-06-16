import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyWebComponent } from './body-web.component';

describe('BodyWebComponent', () => {
  let component: BodyWebComponent;
  let fixture: ComponentFixture<BodyWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

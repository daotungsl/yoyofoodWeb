import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAddressAddComponent } from './shop-address-add.component';

describe('ShopAddressAddComponent', () => {
  let component: ShopAddressAddComponent;
  let fixture: ComponentFixture<ShopAddressAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAddressAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAddressAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

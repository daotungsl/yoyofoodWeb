import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAddressListComponent } from './shop-address-list.component';

describe('ShopAddressListComponent', () => {
  let component: ShopAddressListComponent;
  let fixture: ComponentFixture<ShopAddressListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAddressListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

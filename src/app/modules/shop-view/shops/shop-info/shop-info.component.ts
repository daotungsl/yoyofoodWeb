import { Component, OnInit } from '@angular/core';
import { ShopsService } from '../shops.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ERROR_SHOP_INFO } from 'src/app/shared/err-notify';
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout.component';
import { IInfoSo } from 'src/app/interfaces/shop-owner/Info-so.interface';
import { CustomerService } from 'src/app/auth/customer.service';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.scss']
})
export class ShopInfoComponent implements OnInit {
  formShopInfo: FormGroup;
  errors = ERROR_SHOP_INFO;
  shopInfo: IInfoSo
  filename: any;
  datasTypeStore: any;

  constructor(
    private fb: FormBuilder,
    private shopService: ShopsService,
    private customer: CustomerService,

  ) { }

  ngOnInit() {
    this.shopInfo = this.customer.getStore();
    this.datasTypeStore = (this.customer.getTypeStore()).data;
    this.formShopInfo = this.fb.group(this.shopService.UpdateInfoFormControl);
    console.log(this.shopInfo)
    console.log(this.datasTypeStore)
    this.filename = this.shopInfo.data.image;
    this.datasTypeStore.forEach(element => {
      console.log(element)
      if (this.shopInfo.data.typeStore == element.name) {
        this.formShopInfo
          .get('typeStoreId')
          .setValue(element.id);
      }
    });
    this.formShopInfo
      .get('id')
      .setValue(this.shopInfo.data.id);

    this.formShopInfo
      .get('phone')
      .setValue(this.shopInfo.data.phone);

    this.formShopInfo
      .get('email')
      .setValue(this.shopInfo.data.email);

    this.formShopInfo
      .get('name')
      .setValue(this.shopInfo.data.name);

    this.formShopInfo
      .get('images')
      .setValue(this.shopInfo.data.image);

    this.formShopInfo
      .get('status')
      .setValue(this.shopInfo.data.status);









  }

  doSubmit() {
    console.log(this.formShopInfo.value)

    // if (this.formShopInfo.invalid) {
    //   return;
    // }
    // this.formShopInfo.value
    // this.shopService.tryAddShopInfo(this.formShopInfo.value).subscribe({
    //   next: value => {
    //     console.log(value)
    //   },
    //   error: err => {
    //     console.log(err.error)
    //   }
    // })
  }

  getImageFromInput(event) {
    if (event.target.value == null) {
      this.filename = './assets/img/brand/img-default.png'
    }
    this.filename = event.target.value
    console.log(event.target.value)
  }
}

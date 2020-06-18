import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Products.service';
import { ITypeProductSO } from 'src/app/interfaces/shop-owner/Product-type-so.interface';
import { NgbDate, ModalDismissReasons, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ERROR_SHOP_PRODUCT } from 'src/app/shared/err-notify';
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout.component';
import { IAccount } from 'src/app/interfaces/web-client/account-wc.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  formProductAdd: FormGroup;

  filename: any;
  dataTypeProduct: ITypeProductSO
  datasTypeProduct: any;
  errors = ERROR_SHOP_PRODUCT;
  accountShopInfo: IAccount;

  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  closeResult: string;
  model1: NgbDate;
  model2: NgbDate;

  timeSlot = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']

  dayOfWeek = [
    { id: 2, name: 'Thứ 2' },
    { id: 3, name: 'Thứ 3' },
    { id: 4, name: 'Thứ 4' },
    { id: 5, name: 'Thứ 5' },
    { id: 6, name: 'Thứ 6' },
  ]

  constructor(
    private serviceProduct: ProductsService, calendar: NgbCalendar,
    private router: Router,
    private fb: FormBuilder,
    private admin: AdminLayoutComponent



  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }


  mama(event) {
    console.log(event)
  }
  isRangeStart(date: NgbDate) {
    return this.model1 && this.model2 && date.equals(this.model1);
  }
  isRangeEnd(date: NgbDate) {
    return this.model1 && this.model2 && date.equals(this.model2);
  }
  isInRange(date: NgbDate) {
    return date.after(this.model1) && date.before(this.model2);
  }
  isActive(date: NgbDate) {
    return date.equals(this.model1) || date.equals(this.model2);
  }
  endDateChanged(date) {
    if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day)) {
      this.model1 = this.model2;
    }
  }
  startDateChanged(date) {
    if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day)) {
      this.model2 = this.model1;
    }
  }
  ngOnInit() {
    this.accountShopInfo = this.admin.ACCOUNT_SHOP_INFO
    this.filename = './assets/img/brand/img-default.png'
    this.formProductAdd = this.fb.group(
      this.serviceProduct.ProductFormControl
    );
    this.formProductAdd.get('storeId').setValue(this.accountShopInfo.data.account.storeId);
    this.serviceProduct.getAllTypeProduct().subscribe({
      next: value => {
        this.dataTypeProduct = value;
        this.datasTypeProduct = value.data;
        console.log(this.dataTypeProduct);
      },
      error: err => {
        console.log(err);
      }
    });
    console.log("in add Product");
  }
  convertDay(value) {
    return value = new Date().getTime();
  }
  
  doSubmit() {
    if (this.formProductAdd.invalid) {
      return;
    }
  
    console.log(this.formProductAdd.value);

    this.serviceProduct.tryAddProduct(this.formProductAdd.value)
      .subscribe({
        next: value => {
          console.log(value)
          this.router.navigateByUrl('/shop/product/list');
        },
        error: err => {
          console.log(err)

        }
      })
  }
  getImageFromInput(event){
    if(event.target.value == null){
      this.filename = './assets/img/brand/img-default.png'
    }
    this.filename = event.target.value
    console.log(event.target.value)
  }
}

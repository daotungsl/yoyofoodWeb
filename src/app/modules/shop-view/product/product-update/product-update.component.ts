import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ITypeProductSO } from 'src/app/interfaces/shop-owner/Product-type-so.interface';
import { ERROR_SHOP_PRODUCT } from 'src/app/shared/err-notify';
import { IAccount } from 'src/app/interfaces/web-client/account-wc.interface';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../products.service';
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout.component';
import { IProductSO } from 'src/app/interfaces/shop-owner/Product-so.interface';
import { CustomerService } from 'src/app/auth/customer.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  nameProduct: string;
  formProductUpdate: FormGroup;

  filename: any;
  dataTypeProduct: ITypeProductSO
  datasTypeProduct: any;
  dataProduct: IProductSO;
  dataEditProduct: any;
  errors = ERROR_SHOP_PRODUCT;
  accountShopInfo: IAccount;
  listProduct: any[] = [];
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
    private route: ActivatedRoute,
    private serviceProduct: ProductsService, calendar: NgbCalendar,
    private fb: FormBuilder,
    private admin: AdminLayoutComponent,
    private customer: CustomerService,
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.nameProduct = params.get('nameProduct');

    });
    this.accountShopInfo = this.admin.ACCOUNT_SHOP_INFO

    this.formProductUpdate = this.fb.group(
      this.serviceProduct.ProductUpdateFormControl
    );

this.datasTypeProduct = this.customer.getTypeProduct();
    
    this.listProduct = this.customer.getProductList();

    this.listProduct.forEach(element => {
      if (element.nameUnAccent == this.nameProduct) {
        this.getProduct(element);
      }


    });




    this.formProductUpdate.get('storeId').setValue(this.accountShopInfo.data.account.storeId);



    console.log("in update Product");
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

  convertDayToTimls(value) {
    let convertTime = `${value.month} ${value.day} ${value.year}`
    return new Date(convertTime).getTime();
  }
  convertTimlsToDay(value) {
    let convertTime = (value.split(" ")[1]).split("/");
    return {
      year: +convertTime[2],
      month: +convertTime[1],
      day: +convertTime[0]
    }

  }
  doSubmit() {
    

    if (this.formProductUpdate.invalid) {
      console.log('invalid')
      console.log(this.formProductUpdate)
      return;
    }
    let transStartDay = this.formProductUpdate.get('startDay').value;
    let transexpiredDay = this.formProductUpdate.get('expiredDay').value;


    this.formProductUpdate.get('startDay').setValue(this.convertDayToTimls(transStartDay));
    this.formProductUpdate.get('expiredDay').setValue(this.convertDayToTimls(transexpiredDay));
    console.log(this.formProductUpdate.value)

    this.serviceProduct.tryUpdateProduct(this.formProductUpdate.value)
      .subscribe({
        next: value => {
          console.log(value)

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

  getProduct(value) {
    this.dataProduct = value;
    this.dataEditProduct = value;

    console.log(this.datasTypeProduct);

    this.datasTypeProduct.forEach(element => {
      if (value.typeProduct == element.name) {
        console.log(element.id);
        this.formProductUpdate.get('typeProductId').setValue(element.id);
      }
    });

    this.formProductUpdate.get('name').setValue(value.name);
    this.formProductUpdate.get('id').setValue(value.id);
    this.formProductUpdate.get('description').setValue(value.description);
    this.formProductUpdate.get('image').setValue(value.image);
    this.formProductUpdate.get('percent').setValue(value.percent);
    this.formProductUpdate.get('maxSlot').setValue(value.maxSlot);
    this.formProductUpdate.get('expiredDay').setValue(this.convertTimlsToDay(value.expiredDay));
    this.formProductUpdate.get('startDay').setValue(this.convertTimlsToDay(value.startDay));
    this.formProductUpdate.get('startTime').setValue(value.promotionTimeDto.startTime);
    this.formProductUpdate.get('endTime').setValue(value.promotionTimeDto.endTime);
    this.formProductUpdate.get('maxSlot').setValue(value.promotionTimeDto.dayWeek);


  }
}

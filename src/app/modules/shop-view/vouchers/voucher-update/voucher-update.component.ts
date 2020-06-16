import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ITypeVoucherSO } from 'src/app/interfaces/shop-owner/voucher-type-so.interface';
import { ERROR_SHOP_VOUCHER } from 'src/app/shared/err-notify';
import { IAccount } from 'src/app/interfaces/web-client/account-wc.interface';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { VouchersService } from '../vouchers.service';
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout.component';
import { IVoucherSO } from 'src/app/interfaces/shop-owner/voucher-so.interface';
import { CustomerService } from 'src/app/auth/customer.service';

@Component({
  selector: 'app-voucher-update',
  templateUrl: './voucher-update.component.html',
  styleUrls: ['./voucher-update.component.scss']
})
export class VoucherUpdateComponent implements OnInit {
  nameVoucher: string;
  formVoucherUpdate: FormGroup;

  filename: any;
  dataTypeVoucher: ITypeVoucherSO
  datasTypeVoucher: any;
  dataVoucher: IVoucherSO;
  dataEditVoucher: any;
  errors = ERROR_SHOP_VOUCHER;
  accountShopInfo: IAccount;
  listVoucher: any[] = [];
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
    private serviceVoucher: VouchersService, calendar: NgbCalendar,
    private fb: FormBuilder,
    private admin: AdminLayoutComponent,
    private customer: CustomerService,
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.nameVoucher = params.get('nameVoucher');

    });
    this.accountShopInfo = this.admin.ACCOUNT_SHOP_INFO

    this.formVoucherUpdate = this.fb.group(
      this.serviceVoucher.VoucherUpdateFormControl
    );

this.datasTypeVoucher = this.customer.getTypeVoucher();
    
    this.listVoucher = this.customer.getVoucherList();

    this.listVoucher.forEach(element => {
      if (element.nameUnAccent == this.nameVoucher) {
        this.getVoucher(element);
      }


    });




    this.formVoucherUpdate.get('storeId').setValue(this.accountShopInfo.data.account.storeId);



    console.log("in update voucher");
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
    

    if (this.formVoucherUpdate.invalid) {
      console.log('invalid')
      console.log(this.formVoucherUpdate)
      return;
    }
    let transStartDay = this.formVoucherUpdate.get('startDay').value;
    let transexpiredDay = this.formVoucherUpdate.get('expiredDay').value;


    this.formVoucherUpdate.get('startDay').setValue(this.convertDayToTimls(transStartDay));
    this.formVoucherUpdate.get('expiredDay').setValue(this.convertDayToTimls(transexpiredDay));
    console.log(this.formVoucherUpdate.value)

    this.serviceVoucher.tryUpdateVoucher(this.formVoucherUpdate.value)
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

  getVoucher(value) {
    this.dataVoucher = value;
    this.dataEditVoucher = value;

    console.log(this.datasTypeVoucher);

    this.datasTypeVoucher.forEach(element => {
      if (value.typeVoucher == element.name) {
        console.log(element.id);
        this.formVoucherUpdate.get('typeVoucherId').setValue(element.id);
      }
    });

    this.formVoucherUpdate.get('name').setValue(value.name);
    this.formVoucherUpdate.get('id').setValue(value.id);
    this.formVoucherUpdate.get('description').setValue(value.description);
    this.formVoucherUpdate.get('image').setValue(value.image);
    this.formVoucherUpdate.get('percent').setValue(value.percent);
    this.formVoucherUpdate.get('maxSlot').setValue(value.maxSlot);
    this.formVoucherUpdate.get('expiredDay').setValue(this.convertTimlsToDay(value.expiredDay));
    this.formVoucherUpdate.get('startDay').setValue(this.convertTimlsToDay(value.startDay));
    this.formVoucherUpdate.get('startTime').setValue(value.promotionTimeDto.startTime);
    this.formVoucherUpdate.get('endTime').setValue(value.promotionTimeDto.endTime);
    this.formVoucherUpdate.get('maxSlot').setValue(value.promotionTimeDto.dayWeek);


  }
}

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';
import { VouchersService } from '../../shop-view/vouchers/vouchers.service';
import { IVoucherSO } from 'src/app/interfaces/shop-owner/voucher-so.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ERROR_ODER_VOUCHER } from 'src/app/shared/err-notify';
import { WebLayoutService } from 'src/app/layouts/web-layout/web-layout.service';
import { NgbDate, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/auth/customer.service';
import { LoginService } from 'src/app/pages/login/login.service';
import { Md5 } from 'ts-md5';
import { IAccount } from 'src/app/interfaces/web-client/account-wc.interface';
import { ProductsService } from '../../shop-view/product/products.service';
import { Item } from './item.component';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  formOder: FormGroup;
  form: FormGroup;
  token: any;
  isValid = true;
  passEnd: any;
  errors = ERROR_ODER_VOUCHER;
  redirectUrl: any;
  infoAddress: any;
  infoOder: any;
  modalSuccess: any;
  public location: Location;
  dataVoucher: any;
  dataProduct: any;
  dataTimeVoucher: any;
  dataTimeProduct: any;
  dataAddress: any;
  dataSuccess: any;
  isShow = false;
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  closeResult: string;
  model1: NgbDate;
  model2: NgbDate;

  private items: Item[] = [];
	private total: number = 0;

  timeSlot = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']

  constructor(
    private fb: FormBuilder,
    location: Location,
    private route: ActivatedRoute,
    private customer: CustomerService,
    private modalService: NgbModal,
    private router: Router,
    private service: LoginService,
    private voucherSevice: VouchersService,
    private productSevice: ProductsService,
    private webSevice: WebLayoutService,


  ) {
    this.location = location;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
   
    this.route.paramMap.subscribe((params: ParamMap) => {
      // this.getVoucherByUA(params.get('url'));
      this.getProductByUA(params.get('url'));
      this.redirectUrl = params.get("url")

    });
    window.scrollTo(0, 0);
    this.form = this.fb.group(this.service.loginFormControl);

    this.formOder = this.fb.group(
      // this.voucherSevice.OderFornControl
      this.productSevice.OderFornControl
    );



  }
  goBack() {
    this.location.back();
  }
  renderTime(startTime, endTime) {
    this.dataTimeVoucher = this.timeSlot
    for (let index = 0; index < this.dataTimeVoucher.length; index++) {
      const element = this.dataTimeVoucher[0];
      if (element == startTime) {
        break;
      }
      this.dataTimeVoucher.shift()
    }

    for (let index = this.dataTimeVoucher.length - 1; index > 0; index--) {
      const element = this.dataTimeVoucher[index];
      if (element == endTime) {
        break;
      }
      this.dataTimeVoucher.pop()
    }

  }
  getVoucherByUA(value) {
    this.voucherSevice.getVoucherByUA(value)
      .subscribe({
        next: value => {
          console.log(value)
          this.dataVoucher = value;
          this.customer.setVoucher(value);
          this.dataAddress = value.data.storeAddress;
          localStorage.setItem('DATA_ADDRESS', JSON.stringify(value.data.storeAddress));
          this.renderTime(value.data.promotionTimeDto.startTime, value.data.promotionTimeDto.endTime);

        },
        error: err => {
          console.log(err.error)

        }
      })
  }
  getProductByUA(value) {
    this.productSevice.getProductByUA(value)
      .subscribe({
        next: value => {
          console.log(value)
          this.dataProduct = value;
          this.customer.setProduct(value);
          this.dataAddress = value.data.storeAddress;
          localStorage.setItem('DATA_ADDRESS', JSON.stringify(value.data.storeAddress));
          // this.renderTime(value.data.promotionTimeDto.startTime, value.data.promotionTimeDto.endTime);

        },
        error: err => {
          console.log(err.error)

        }
      })
  }

  doSubmit() {
      this.formOder.get('storeId').setValue(this.customer.getProduct().data.storeId)
      this.formOder.get('productId').setValue(this.customer.getProduct().data.id)
      this.formOder.get('accountId').setValue(this.customer.getAccount().data.account.id)
      this.formOder.get('price').setValue(this.customer.getProduct().data.price)
      this.formOder.get('name').setValue(this.dataProduct.data.name)
    this.isValid = false;
    if (this.formOder.invalid) {
      return;
    }
    var item: Item = {
      product: this.formOder.value,
      quantity: this.formOder.value.adults
    };

    if (this.customer.getCart() == null) {
      let cart: any = [];
      cart.push(JSON.stringify(item));
      this.customer.setCart(cart);
    }else {
      let cart: any = this.customer.getCart();
      console.log(cart);

      let index: number = -1;
      for (var i = 0; i < cart.length; i++) {
        let item: Item = JSON.parse(cart[i]);
      console.log(item.product.productId);
      console.log(this.formOder.value.productId);
        if (item.product.productId == this.formOder.value.productId) {
          index = i;
          break;
        }
      }
      if (index == -1) {
        cart.push(JSON.stringify(item));
        this.customer.setCart(cart);
      } else {
        let item: Item = JSON.parse(cart[index]);
        item.quantity += this.formOder.value.adults;
        cart[index] = JSON.stringify(item);
        this.customer.setCart(cart);
      }
    }
  }
  doLogin() {
    if (this.form.invalid) {
      return;
    }
    const md5 = new Md5();

    const passHash = md5.appendStr(this.form.value.password).end();
    this.passEnd = passHash;

    this.form.get('password').setValue(this.passEnd.toUpperCase());

    console.log(this.form.value);
    this.service.trylogin(this.form.value)
      .subscribe({
        next: value => {
          console.log(value)
          this.token = value.data.credential.accessToken;

          if (value.data.account.typeAccount == 0) {
            console.log('in user');
            this.customer.setAccount(value);
            this.customer.setTokenAccount(this.token);
            this.modalService.dismissAll();
            this.router.navigateByUrl('/detail/' + this.redirectUrl)
          }

          if (value.data.account.typeAccount == 1) {
            console.log('in shop');
            alert("Bạn không thể dùng account shop để đặt chỗ")

          }
        },
        error: err => {
          console.log(err)
          this.form.get('password').setValue(null);
          console.log(this.form.value)

        }
      })
  }
  changeShow() {
    this.isShow = !this.isShow;
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

  open(oder, login, type, modalDimension) {

    if (modalDimension === 'sm' && type === 'modal_add') {
      this.modalService.open(oder, { windowClass: 'modal-lage', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else if (modalDimension === 'sm' && type === 'modal_edit') {
      this.modalService.open(oder, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else if (modalDimension === '' && type === 'modal_oder') {

      if (!this.customer.getAccount()) {
        this.modalService.open(login, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
      console.log(this.formOder.value);
      this.doSubmit()
      this.modalService.open(oder, { windowClass: 'modal-danger', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

    } else {
      this.modalService.open(oder, { centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }




  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ShopsService } from '../shops.service';
import { ERROR_ADDRESS } from 'src/app/shared/err-notify';
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout.component';
import { IAccount } from 'src/app/interfaces/web-client/account-wc.interface';
import { WebLayoutService } from 'src/app/layouts/web-layout/web-layout.service';
import { CustomerService } from 'src/app/auth/customer.service';


@Component({
  selector: 'app-shop-address-list',
  templateUrl: './shop-address-list.component.html',
  styleUrls: ['./shop-address-list.component.scss']
})
export class ShopAddressListComponent implements OnInit {
  formAddAddress: FormGroup
  formUpdateAddress: FormGroup
  errors = ERROR_ADDRESS;
  accountShopInfo: IAccount;
  dataCities: any;
  // storeAddresses = [{
  //   adderss: String,
  //   city: String,
  //   description: String,
  //   store: String,
  //   status: Int16Array
  // }
  // ]
  storeAddresses: any;
  closeResult: string;


  constructor(
    private fb: FormBuilder,
    private admin: AdminLayoutComponent,
    private webService: WebLayoutService,
    private customer: CustomerService,
    private shopService: ShopsService,
    private modalService: NgbModal

  ) { }

  ngOnInit() {
    this.accountShopInfo = this.admin.ACCOUNT_SHOP_INFO
    this.getAllCity();
    this.storeAddresses = (this.customer.getStore()).data.storeAddresses;

    this.formAddAddress = this.fb.group(this.shopService.AddAressFormControl);
    this.formUpdateAddress = this.fb.group(this.shopService.UpdateAressFormControl);

    this.formAddAddress.get('storeId').setValue(this.accountShopInfo.data.account.storeId);
    this.formUpdateAddress.get('storeId').setValue(this.accountShopInfo.data.account.storeId);
  }

  doSubmit() {

    if (this.formAddAddress.invalid) {
      return;
    }
    console.log(this.formAddAddress.value);
    this.shopService.tryAddAddress(this.formAddAddress.value)
      .subscribe({
        next: value => {
          console.log(this.accountShopInfo.data.account.storeId)

          this.getInfoStore(this.accountShopInfo.data.account.storeId)
          console.log(value);

        },
        error: err => {
          console.log(err);

        }
      })
  }
  doSubmitUpdate() {
    console.log(this.formUpdateAddress.value);

    if (this.formUpdateAddress.invalid) {
      return;
    }
    console.log(this.formUpdateAddress.value);
    this.shopService.tryUpdateAddress(this.formUpdateAddress.value)
      .subscribe({
        next: value => {
          this.getInfoStore(this.accountShopInfo.data.account.storeId)
          console.log(value);

        },
        error: err => {
          console.log(err);

        }
      })
  }
  doDelete(){

    this.shopService.tryDeleteAddress(this.formUpdateAddress.get('id').value)
    .subscribe({
      next: value => {
        this.modalService.dismissAll();
        this.ngOnInit();
      },
      error: err => {
        console.log(err);

      }
    })
  }
  getInfoStore(value) {
    this.webService.getInfoStore(value)
      .subscribe({
        next: value => {
          this.customer.setStore(value);
          this.modalService.dismissAll()

          this.ngOnInit();

        },
        error: err => {
          console.log(err)
        }
      });

  }
  getAllCity() {
    this.webService.getCity()
      .subscribe({
        next: value => {
          console.log(value)
          this.dataCities = value.data
        },
        error: err => {
          console.log(err.error)

        }
      })
  }

  open(content, type, modalDimension, data) {
    console.log(data)
    this.formUpdateAddress.get('address').setValue(data.address);
    this.formUpdateAddress.get('description').setValue(data.description);
    this.formUpdateAddress.get('id').setValue(data.id);

    this.dataCities.forEach(element => {
      if (data.city == element.name) {
        this.formUpdateAddress.get('cityId').setValue(element.id);

      }

    });

    if (modalDimension === 'sm' && type === 'modal_add') {
      this.modalService.open(content, { windowClass: 'modal-lage', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else if (modalDimension === 'sm' && type === 'modal_edit') {

      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else if (modalDimension === '' && type === 'modal_delete') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.modalService.open(content, { centered: true }).result.then((result) => {
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

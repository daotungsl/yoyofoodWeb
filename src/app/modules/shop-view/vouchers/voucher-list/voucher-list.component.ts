import { Component, OnInit, ViewChild } from '@angular/core';
import { VoucherComponent } from '../voucher/voucher.component';
import { VouchersService } from '../vouchers.service';
import { CustomerService } from 'src/app/auth/customer.service';
import { ShopsService } from '../../shops/shops.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { WebLayoutService } from 'src/app/layouts/web-layout/web-layout.service';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss']
})
export class VoucherListComponent implements OnInit {
  datasVoucher: any;
  closeResult: string;
  constructor(
    private voucherService: VouchersService,
    private webService: WebLayoutService,
    private customer: CustomerService,
    private modalService: NgbModal


  ) { }

  ngOnInit() {
    this.getInfoStore(this.customer.getAccountStore().data.account.storeId);
    this.getTypeVoucher();
    
  }
  open(content, type, modalDimension, data) {


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
  getInfoStore(value) {
    this.webService.getInfoStore(value)
      .subscribe({
        next: value => {
          console.log('in get info store' + value)
          this.getVoucher(value.data.id)
        },
        error: err => {
          console.log(err)
        }
      });

  }

  getVoucher(value) {
    this.voucherService.getAllVoucherByStore(value)
      .subscribe({
        next: value => {
          console.log('in get voucher' + value)
          this.datasVoucher = value.data;
          this.customer.setVoucherList(value.data)
          console.log(this.datasVoucher)
        },
        error: err => {
          console.log(err)
        }
      });

  }
  getTypeVoucher() {
    this.voucherService.getAllTypeVoucher().subscribe({
      next: value => {
       this.customer.setTypeVoucher(value.data)
      },
      error: err => {
        console.log(err);
      }
    });
  }
}

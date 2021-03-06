import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/auth/customer.service';
import { WebLayoutService } from 'src/app/layouts/web-layout/web-layout.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from '../transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  datasTransaction: any;
  closeResult: string;
  car: any;
  constructor(
    private transactionService: TransactionService,
    private webService: WebLayoutService,
    private modalService: NgbModal,
    private router: Router,
    private customer: CustomerService,


  ) { }

  ngOnInit() {
    this.getTransaction();

  }


  getTransaction() {
    this.transactionService.getAllTransactionByStore()
      .subscribe({
        next: value => {
          this.datasTransaction = value.data;
        },
        error: err => {
          console.log(err)
        }
      });

  }
  open(content, type, modalDimension, data) {

    console.log(data);

    if (modalDimension === 'sm' && type === 'modal_add') {
      this.modalService.open(content, { windowClass: 'modal-lage', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else if (modalDimension === 'lg' && type === 'modal_edit') {

      this.modalService.open(content, { windowClass: 'modal-mini', size: 'lg', centered: true }).result.then((result) => {
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
  doConfirm(data: any){

    this.transactionService.tryConfirmOrder(data,1)
    .subscribe({
      next: value => {
        console.log(value)
        this.ngOnInit();
        this.modalService.dismissAll();
      },
      error: err => {
        console.log(err)
      }
    });
  }
  doComplete(data: any){
    this.transactionService.tryConfirmOrder(data,2)
    .subscribe({
      next: value => {
        this.ngOnInit();
        this.modalService.dismissAll();
        console.log(value)
      },
      error: err => {
        console.log(err)
      }
    });
  }
  doCancelled(data: any){
    this.transactionService.tryConfirmOrder(data,-1)
    .subscribe({
      next: value => {
        this.ngOnInit();
        this.modalService.dismissAll();
        console.log(value)
      },
      error: err => {
        console.log(err)
      }
    });
  }


}

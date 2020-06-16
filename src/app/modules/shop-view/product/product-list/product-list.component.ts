import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from '../products.service';
import { CustomerService } from 'src/app/auth/customer.service';
import { ShopsService } from '../../shops/shops.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { WebLayoutService } from 'src/app/layouts/web-layout/web-layout.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  datasProduct: any;
  closeResult: string;
  constructor(
    private ProductService: ProductsService,
    private webService: WebLayoutService,
    private customer: CustomerService,
    private modalService: NgbModal


  ) { }

  ngOnInit() {
    this.getInfoStore(this.customer.getAccountStore().data.account.storeId);
    this.getTypeProduct();
    
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
          this.getProduct(value.data.id)
        },
        error: err => {
          console.log(err)
        }
      });

  }

  getProduct(value) {
    this.ProductService.getAllProductByStore(value)
      .subscribe({
        next: value => {
          console.log('in get Product' + value)
          this.datasProduct = value.data;
          this.customer.setProductList(value.data)
          console.log(this.datasProduct)
        },
        error: err => {
          console.log(err)
        }
      });

  }
  getTypeProduct() {
    this.ProductService.getAllTypeProduct().subscribe({
      next: value => {
       this.customer.setTypeProduct(value.data)
      },
      error: err => {
        console.log(err);
      }
    });
  }
}

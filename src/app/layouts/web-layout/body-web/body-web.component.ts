import { Component, OnInit } from '@angular/core';
import { WebLayoutService } from '../web-layout.service';
import { IAllVoucher } from 'src/app/interfaces/web-client/voucher-all.interface';
import { ITypeVoucherSO } from 'src/app/interfaces/shop-owner/voucher-type-so.interface';

@Component({
  selector: 'app-body-web',
  templateUrl: './body-web.component.html',
  styleUrls: ['./body-web.component.scss']
})
export class BodyWebComponent implements OnInit {

  dataCategories: any;
  dataVoucher: any;
  constructor(
    private webService : WebLayoutService
  ) { }

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory(){
    this.webService.getAllCategory()
    .subscribe({
      next: value => {
        console.log(value)
        this.dataCategories = value.data
      },
      error: err => {
        console.log(err.error)
  
      }
    })
  }
  getAllVoucher(){
    this.webService.getAllVoucher()
    .subscribe({
      next: value => {
        console.log(value)
        this.dataVoucher = value.data
      },
      error: err => {
        console.log(err.error)
  
      }
    })
  }
}

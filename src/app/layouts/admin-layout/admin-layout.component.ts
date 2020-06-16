import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/auth/customer.service';
import { IAccount } from 'src/app/interfaces/web-client/account-wc.interface';
import { IInfoSo } from 'src/app/interfaces/shop-owner/Info-so.interface';
import { WebLayoutService } from '../web-layout/web-layout.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  public ACCOUNT_SHOP_INFO: IAccount;
  public ACCOUNT_STORE: IInfoSo;

  public NAME_USER;
  public NAME_SHOP;
  public AVATAR_SHOP;
  constructor(
    private customer: CustomerService,
    private webService: WebLayoutService,

  ) { }

  ngOnInit() {
    this.ACCOUNT_SHOP_INFO = this.customer.getAccountStore();
    this.ACCOUNT_STORE = this.customer.getStore();
    if (this.ACCOUNT_SHOP_INFO.data.account.fullName) {
      this.NAME_USER = this.ACCOUNT_SHOP_INFO.data.account.fullName;
    } else {
      this.NAME_USER = this.ACCOUNT_SHOP_INFO.data.account.email;

    }
    this.NAME_SHOP = this.ACCOUNT_SHOP_INFO.data.account.email;
    this.AVATAR_SHOP = this.ACCOUNT_STORE.data.image;
    this.getInfoStore(this.ACCOUNT_SHOP_INFO.data.account.storeId);
    this.getTypeStore();
    // if(!this.customer.getStore()){
    //   console.log('in get store')
    //   this.getInfoStore(this.ACCOUNT_SHOP_INFO.data.account.storeId);
    // this.getTypeStore();
    // }
    


  }

  getInfoStore(value) {
    this.webService.getInfoStore(value)
      .subscribe({
        next: value => {
          this.customer.setStore(value);
        },
        error: err => {
          console.log(err)
        }
      });

  }
  getTypeStore() {
    this.webService.getTypeStore().subscribe({
      next: value => {
        this.customer.setTypeStore(value)
      },
      error: err => {
        console.log(err)
      }
    })
  }
 
}

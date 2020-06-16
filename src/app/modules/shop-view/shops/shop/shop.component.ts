import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout.component';
import { IAccount } from 'src/app/interfaces/web-client/account-wc.interface';
import { CustomerService } from 'src/app/auth/customer.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  public ACCOUNT_SHOP_INFO: IAccount;
  username:any;
  constructor(
    private customer: CustomerService,
    private admin: AdminLayoutComponent,

  ) { }

  ngOnInit() {
    this.ACCOUNT_SHOP_INFO = this.customer.getAccountStore();
    this.username = this.ACCOUNT_SHOP_INFO.data.account.fullName;

  }

  
}

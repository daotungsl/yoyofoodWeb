import { Component, OnInit } from '@angular/core';
import { WebLayoutService } from '../web-layout.service';
import { ICity } from 'src/app/interfaces/web-client/city-wc.interface';
import { CustomerService } from 'src/app/auth/customer.service';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-web',
  templateUrl: './header-web.component.html',
  styleUrls: ['./header-web.component.scss']
})
export class HeaderWebComponent implements OnInit {

  public CITY: ICity;
  dataCities: any;
  accountUser: any;
  checkLogin: any;
  constructor(
    private webService: WebLayoutService,
    private customer: CustomerService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.checkLogin = this.customer.isLogged()
    if (this.checkLogin) {
      if(this.customer.getAccount().data.account.fullName){
        this.accountUser = this.customer.getAccount().data.account.fullName;
      }else if(this.customer.getAccount().data.account.email){
        this.accountUser = this.customer.getAccount().data.account.email;

      }else{
        this.accountUser = null;
      }
      
    }
    console.log(this.customer.getAccount());
    this.getAllCity();
  }
  tryLogout() {
    this.customer.removeAccount();
    this.customer.removeAccountStore();
    this.customer.removeStore();
    this.customer.removeToken();
    this.customer.removeTypeStore();
    this.customer.removeTypeVoucher();
    this.customer.removeVoucherList();
    this.router.navigateByUrl('/')
  }

  getAllCity() {
    this.webService.getCity()
      .subscribe({
        next: value => {
          console.log(value)
          this.CITY = value;
          this.dataCities = value.data
        },
        error: err => {
          console.log(err.error)

        }
      })
  }
}

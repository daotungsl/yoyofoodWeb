import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';
import { CustomerService } from 'src/app/auth/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Md5 } from 'ts-md5';
import { ShopsService } from 'src/app/modules/shop-view/shops/shops.service';
import { IInfoSo } from 'src/app/interfaces/shop-owner/Info-so.interface';
import { WebLayoutService } from 'src/app/layouts/web-layout/web-layout.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  token: any;
  passEnd: any;
  redirectUrl: any;

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private customer: CustomerService,
    private shopService: ShopsService,
    private router: Router,
    private webService: WebLayoutService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.customer.isLogged()) {
      this.router.navigateByUrl("/");
    }
    if (this.customer.isLoggedShop()) {
      this.router.navigateByUrl("/shop/dashboard");
    }
    this.form = this.fb.group(this.service.loginFormControl);
    this.route.queryParamMap.subscribe(params => {
      this.redirectUrl = params.get("redirectUrl")
    })

  }
  ngOnDestroy() {
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      alert('you just clicked enter');
      // rest of your code
    }
  }

  doSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value.password);
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
            this.redirectUrl = '/'
          }

          if (value.data.account.typeAccount == 1) {
            console.log('in shop');

            this.customer.setAccountStore(value);
            this.customer.setTokenStore(this.token);

            this.webService.getInfoStore(value.data.account.storeId)
              .subscribe({
                next: value => {
                  this.customer.setStore(value);
                },
                error: err => {
                  console.log(err)
                }
              });
            this.redirectUrl = '/store/controller/dashboard'
          }

          this.router.navigateByUrl(this.redirectUrl)



        },
        error: err => {
          console.log(err)
          this.form.get('password').setValue(null);
          console.log(this.form.value)

        }
      })
  }


}
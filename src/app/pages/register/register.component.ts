import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterService } from './register.service';
import { CustomerService } from 'src/app/auth/customer.service';
import { Router } from '@angular/router';
import { ERROR_REGISTER } from 'src/app/shared/err-notify';
import { LoginService } from '../login/login.service';
import { MustMatch } from './mustMatch.component';
import { Md5 } from 'ts-md5';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  isChecked: boolean;
  token: any;
  errors = ERROR_REGISTER;
  date = new Date();
  account: any;
  passEnd: any;



  constructor(
    private fb: FormBuilder,
    private serviceRegister: RegisterService,
    private serviceLogin: LoginService,
    private modalService: NgbModal,
    private customer: CustomerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.modalService.dismissAll();
    if (this.customer.isLogged()) {
      this.router.navigateByUrl("/");
    }
    this.formRegister = this.fb.group(
      this.serviceRegister.registerFormControl,
      { validator: MustMatch('password', 'repassword') }
    );
    window.scrollTo(0,0);

  }

  checkBoxValue(e) {
    this.isChecked = e.target.checked;

  }
  doSubmit() {

    if (this.formRegister.invalid) {
      return;
    }
    console.log(this.formRegister.value);
    this.serviceRegister.tryRegister(this.formRegister.value)
      .subscribe({
        next: value => {
          console.log(value)
          const md5 = new Md5();

          const passHash = md5.appendStr(value.data.password).end();
          this.passEnd = passHash;
          this.account = {
            username: value.data.username,
            password: this.passEnd.toUpperCase(),
          }

          this.serviceLogin.trylogin(this.account)
            .subscribe({
              next: value => {
                console.log(value);
                this.customer.setAccount(value)
                this.token = value.data.credential.accessToken;
                this.customer.setTokenAccount(this.token);
                this.router.navigateByUrl('/')

                 console.log('request success', localStorage.getItem('TOKEN'));

              },
              error: err => {
                console.log(err)

              }
            })


        },
        error: err => {
          console.log(err.error)

        }
      })
  }
}

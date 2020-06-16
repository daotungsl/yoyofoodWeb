import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterStoreService } from './register-store.service';
import { LoginService } from '../login/login.service';
import { CustomerService } from 'src/app/auth/customer.service';
import { Router } from '@angular/router';
import { ERROR_REGISTER } from 'src/app/shared/err-notify';
import { MustMatch } from '../register/mustMatch.component';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrls: ['./register-store.component.scss']
})
export class RegisterStoreComponent implements OnInit {

  formRegister: FormGroup;
  isChecked: boolean;
  token: any;
  errors = ERROR_REGISTER;
  date = new Date();
  account: any;
  passEnd: any;
  fileToUpload: File = null;
  



  constructor(
    private fb: FormBuilder,
    private serviceRegister: RegisterStoreService,
    private serviceLogin: LoginService,
    private customer: CustomerService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.customer.isLogged()) {
      this.router.navigateByUrl("/shop/dashboard");
    }
    this.formRegister = this.fb.group(
      this.serviceRegister.registerStoreFormControl,
      { validator: MustMatch('password', 'repassword') }
    );
  }

  checkBoxValue(e) {
    this.isChecked = e.target.checked;

  }
  doSubmit() {
    console.log(this.formRegister.value);

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
                this.customer.setAccountStore(value)
                this.token = value.data.credential.accessToken;
                this.customer.setTokenStore(this.token);
                this.router.navigateByUrl('/shop')

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
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
    this.uploadFileToActivity(this.fileToUpload);
}
  uploadFileToActivity(value) {
    this.serviceRegister.postFile(value)
    .subscribe({
      next: value => {
        console.log(value)
      },
      error: err => {
        console.log(err)
  
      }
    })
  }
}

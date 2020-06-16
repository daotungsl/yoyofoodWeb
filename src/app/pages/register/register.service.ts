import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_DOMAIN, HTTP_HEADER, HTTP_HEADER_LOGIN } from 'src/app/shared/constant';
import { map } from 'rxjs/operators';
import { IAccount } from 'src/app/interfaces/web-client/account-wc.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registerFormControl = {
    email:[null, [Validators.required, Validators.email]],
    fullName:[null, [Validators.required, Validators.minLength(6)]],
    phone:[null, [Validators.required, Validators.pattern(/([+]84[9|1]|09|01[2|6|8|9])+([0-9]{8})\b/g)]],
    password:[null,[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]],
    repassword:[null, [Validators.required]],
  }
  constructor(
    private http: HttpClient
  ) { }

  tryRegister(value): Observable<any>{
  return this.http.post<any>(
    `${API_DOMAIN}unauthentic/account/register`,
    value,
    {
      headers: HTTP_HEADER_LOGIN
    }
  ).pipe(
    map(res => {
      console.log(res)
      return res;
    })
  );
}
}

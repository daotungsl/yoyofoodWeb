import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_DOMAIN, HTTP_HEADER_LOGIN, HTTP_HEADER_STORE } from 'src/app/shared/constant';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterStoreService {
  registerStoreFormControl = {
    email:[null, [Validators.required, Validators.email]],
    fullName:[null, [Validators.required, Validators.minLength(6)]],
    phone:[null, [Validators.required, Validators.pattern(/([+]84[9|1]|09|01[2|6|8|9])+([0-9]{8})\b/g)]],
    password:[null,[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]],
    repassword:[null, [Validators.required]],
    gender:[null, [Validators.required]],
    birthday:[null, [Validators.required]],
    // avatar:['https://forum.waka.vn/assets/avatars/default.svg', [Validators.required]],
    address:[null, [Validators.required]],
  }
  constructor(
    private http: HttpClient
  ) { }

  tryRegister(value): Observable<any>{
    console.log(HTTP_HEADER_LOGIN)
  return this.http.post<any>(
    `${API_DOMAIN}unauthentic/store/account/register`,
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

postFile(fileToUpload: File): Observable<any> {
  console.log(fileToUpload);
  console.log(HTTP_HEADER_STORE)
  const formData = new FormData();
  formData.append('file', fileToUpload);
  console.log(formData)
  // formData.set('file',fileToUpload,fileToUpload.name);
  console.log(formData.get('file'));
  return this.http.post(
    `${API_DOMAIN}unauthentic/file/upload`,
    formData,
    {
      headers:{
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('STORE_TOKEN'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      }
    }
  ).pipe(
    map(res => {
      console.log(res)
      return res;
    })
  );
}
}

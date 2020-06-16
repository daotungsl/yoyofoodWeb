import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IVoucherSO } from 'src/app/interfaces/shop-owner/voucher-so.interface';
import { HttpClient } from '@angular/common/http';
import { API_DOMAIN, HTTP_HEADER, HTTP_HEADER_STORE, HTTP_HEADER_LOGIN } from 'src/app/shared/constant';
import { map } from 'rxjs/operators';
import { ITypeVoucherSO } from 'src/app/interfaces/shop-owner/voucher-type-so.interface';

@Injectable({
  providedIn: 'root'
})
export class VouchersService {

  VoucherFormControl = {
    name: [null, [Validators.required, Validators.maxLength(200)]],
    description: [null, [Validators.required, Validators.maxLength(2000)]],
    image: [null, [Validators.required]],
    percent: [null, [Validators.required]],
    maxSlot: [null, [Validators.required]],
    startDay: [null, [Validators.required]],
    expiredDay: [null, [Validators.required]],
    startTime: [null, [Validators.required]],
    endTime: [null, [Validators.required]],
    dayWeek: ['2,3,4,5,6', [Validators.required]],
    storeId: [null, [Validators.required]],
    typeVoucherId: [null, [Validators.required]],
  }
  VoucherUpdateFormControl = {
    name: [null, [Validators.required, Validators.maxLength(200)]],
    description: [null, [Validators.required, Validators.maxLength(2000)]],
    image: [null, [Validators.required]],
    id: [null, [Validators.required]],
    percent: [null, [Validators.required]],
    maxSlot: [null, [Validators.required]],
    startDay: [null, [Validators.required]],
    expiredDay: [null, [Validators.required]],
    startTime: [null, [Validators.required]],
    endTime: [null, [Validators.required]],
    dayWeek: ['2,3,4,5,6', [Validators.required]],
    storeId: [null, [Validators.required]],
    typeVoucherId: [null, [Validators.required]],
  }
  OderFornControl = {
    accountId: [null, [Validators.required]],
    storeId: [null, [Validators.required]],
    // storeAddressId: [null, [Validators.required]],
    voucherId: [null, [Validators.required]],
    adults: [0, [Validators.required]],
    // children: [0, [Validators.required]],
    // time: [null, [Validators.required]],
    // day: [null, [Validators.required]],
    description: [null, []],

  }
 
  constructor(
    private http: HttpClient

  ) { }

  tryAddVoucher(value): Observable<IVoucherSO>{
    console.log(HTTP_HEADER_STORE);
    return this.http.post<IVoucherSO>(
      `${API_DOMAIN}api/stores/store/vouchers/voucher`,
    value,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('STORE_TOKEN'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      }
    }
  ).pipe(
    map(res => {
      console.log(res);
      return res;
    })
  );
  }
  tryUpdateVoucher(value): Observable<IVoucherSO>{
    console.log(value);
    console.log(localStorage.getItem('STORE_TOKEN'));
    return this.http.put<IVoucherSO>(
      `${API_DOMAIN}api/stores/store/vouchers/voucher/${value.id}`,
    value,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('STORE_TOKEN'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      }
    }
  ).pipe(
    map(res => {
      console.log(res);
      return res;
    })
  );
  }
tryOder(value): Observable<any>{
  console.log(HTTP_HEADER);
  return this.http.post<any>(
    `${API_DOMAIN}api/guest/transactions/transaction`,
  value,
  {
    headers: HTTP_HEADER
  }
).pipe(
  map(res => {
    console.log(res);
    return res;
  })
);
}
  getAllTypeVoucher(){
    return this.http.get<ITypeVoucherSO>(
      `${API_DOMAIN}unauthentic/type-vouchers`
  ).pipe(
    map(res => {
      console.log(res);
      return res;
    })
  );
  }
  getAllVoucherByStore(value){
    return this.http.get<IVoucherSO>(
      `${API_DOMAIN}api/stores/${value}/vouchers`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('STORE_TOKEN'),
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
      }
      
  ).pipe(
    map(res => {
      console.log(res);
      return res;
    })
  );
  }
  getVoucherByUA(value){
    return this.http.get<IVoucherSO>(
      `${API_DOMAIN}unauthentic/stores/store/vouchers/voucher/${value}`
  ).pipe(
    map(res => {
      console.log(res);
      return res;
    })
  );
  }
  
}

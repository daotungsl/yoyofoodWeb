import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_DOMAIN, HTTP_HEADER, HTTP_HEADER_STORE, HTTP_HEADER_LOGIN } from 'src/app/shared/constant';
import { map } from 'rxjs/operators';
import { IInfoAcc } from 'src/app/interfaces/shop-owner/InfoAcc-so.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

 
  constructor(
    private http: HttpClient

  ) { }

  


  getAllTransactionByStore(){
    return this.http.get<any>(
      `${API_DOMAIN}api/admin/stores/store/orders`,
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
  getAccountInfo(){
    return this.http.get<any>(
      `${API_DOMAIN}api/admin/accounts`,
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
      return res;
    })
  );
  }
}

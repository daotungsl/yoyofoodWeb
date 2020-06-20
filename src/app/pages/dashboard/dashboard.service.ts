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
export class DashboardService {

 
  constructor(
    private http: HttpClient

  ) { }

  


  getOrderCount(){
    return this.http.get<any>(
      `${API_DOMAIN}api/admin/count-all/orders`,
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

  getProductCount(){
    return this.http.get<any>(
      `${API_DOMAIN}api/admin/count-all/products`,
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
  getAcountCount(){
    return this.http.get<any>(
      `${API_DOMAIN}api/admin/count-all/users`,
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
  getTotalMoney(){
    return this.http.get<any>(
      `${API_DOMAIN}api/admin/money/totals`,
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

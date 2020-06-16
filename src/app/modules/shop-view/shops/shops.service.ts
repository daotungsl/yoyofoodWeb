import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAddressSO } from 'src/app/interfaces/shop-owner/address-so.interface';
import { API_DOMAIN, HTTP_HEADER, HTTP_HEADER_STORE, HTTP_HEADER_STORE_UPFILE } from 'src/app/shared/constant';
import { map } from 'rxjs/operators';
import { IInfoSo } from 'src/app/interfaces/shop-owner/Info-so.interface';
import { DISABLED } from '@angular/forms/src/model';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  AddAressFormControl = {
    address: [null, [Validators.required, Validators.maxLength(100)]],
    description: [null, [Validators.required, Validators.minLength(20)]],
    cityId: [null, [Validators.required]],
    storeId: [null, [Validators.required]]
  }
  UpdateAressFormControl = {
    address: [null, [Validators.required, Validators.maxLength(100)]],
    description: [null, [Validators.required, Validators.maxLength(100)]],
    cityId: [null, [Validators.required]],
    id: [null, [Validators.required]],
    status: [1, [Validators.required]],
    storeId: [null, [Validators.required]]
  }

  AddInfoFormControl = {
    name: [null, [Validators.required, Validators.maxLength(100)]],
    email: [{ value: null, DISABLED: true }, [Validators.required, Validators.email]],
    phone: [{ value: null, DISABLED: true }, [Validators.required, Validators.pattern(/([+]84[9|1]|09|01[2|6|8|9])+([0-9]{8})\b/g)]],
    images: [null, []],
    accountId: [null, [Validators.required]],
    typeStoreId: [null, [Validators.required]],
    address: [null, [Validators.required]],
    description: [null, [Validators.required]],
    cityId: [null, [Validators.required]]
  }
  UpdateInfoFormControl = {
    id: [null, [Validators.required]],
    name: [null, [Validators.required, Validators.maxLength(100)]],
    email: [{ value: null, DISABLED: true }, [Validators.required, Validators.email]],
    phone: [{ value: null, DISABLED: true }, [Validators.required]],
    images: [null, [Validators.required]],
    typeStoreId: [null, [Validators.required]],
    status: [null, [Validators.required]],
  }
  constructor(
    private http: HttpClient
  ) { }

  tryAddAddress(value): Observable<IAddressSO> {
    console.log(HTTP_HEADER_STORE)
    return this.http.post<{ data: IAddressSO }>(
      `${API_DOMAIN}api/stores/store/address`,
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
        return res.data;
      })
    );
  }
  tryUpdateAddress(value): Observable<IAddressSO> {
    console.log(HTTP_HEADER_STORE)
    console.log(value)
    return this.http.put<{ data: IAddressSO }>(
      `${API_DOMAIN}api/stores/store/address/${value.id}`,
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
        return res.data;
      })
    );
  }
  tryDeleteAddress(value) {
    console.log(HTTP_HEADER_STORE)

    return this.http.delete(
      `${API_DOMAIN}api/stores/store/address/${value}`,
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
  tryAddShopInfo(value): Observable<IInfoSo> {
    console.log(HTTP_HEADER_STORE);
    if (HTTP_HEADER_STORE.Authorization == null) {
      let header = {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('STORE_TOKEN'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      }
    }
    return this.http.post<{ data: IInfoSo }>(
      `${API_DOMAIN}api/stores/store`,
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
        return res.data;
      })
    );
  }

}

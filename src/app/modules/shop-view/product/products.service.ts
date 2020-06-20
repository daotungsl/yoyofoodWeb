import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IProductSO } from 'src/app/interfaces/shop-owner/product-so.interface';
import { HttpClient } from '@angular/common/http';
import { API_DOMAIN, HTTP_HEADER, HTTP_HEADER_STORE, HTTP_HEADER_LOGIN } from 'src/app/shared/constant';
import { map } from 'rxjs/operators';
import { ITypeProductSO } from 'src/app/interfaces/shop-owner/product-type-so.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  ProductFormControl = {
    name: [null, [Validators.required, Validators.maxLength(200)]],
    description: [null, [Validators.required, Validators.maxLength(2000)]],
    image: [null, [Validators.required]],
    price: [null, [Validators.required]],
    maxSlot: [null, [Validators.required]],
    storeId: [null, [Validators.required]],
    typeProductId: [null, [Validators.required]],
  }
  ProductUpdateFormControl = {
name: [null, [Validators.required, Validators.maxLength(200)]],
    description: [null, [Validators.required, Validators.maxLength(2000)]],
    image: [null, [Validators.required]],
    id: [null, [Validators.required]],
    price: [null, [Validators.required]],
    maxSlot: [null, [Validators.required]],
    storeId: [null, [Validators.required]],
    typeProductId: [null, [Validators.required]],
    status: [null, [Validators.required]],
  }
  OderFornControl = {
    accountId: [null, [Validators.required]],
    storeId: [null, [Validators.required]],
    // storeAddressId: [null, [Validators.required]],
    productId: [null, [Validators.required]],
    adults: [0, [Validators.required]],
    price: [0, [Validators.required]],
    name: [null, [Validators.required]],
    // children: [0, [Validators.required]],
    // time: [null, [Validators.required]],
    // day: [null, [Validators.required]],
    description: [null, []],

  }
 
  constructor(
    private http: HttpClient

  ) { }

  tryAddProduct(value): Observable<IProductSO>{
    console.log(HTTP_HEADER_STORE);
    return this.http.post<IProductSO>(
      `${API_DOMAIN}api/stores/store/products/product`,
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
  tryUpdateProduct(value): Observable<IProductSO>{
    console.log(value);
    console.log(localStorage.getItem('STORE_TOKEN'));
    return this.http.put<IProductSO>(
      `${API_DOMAIN}api/stores/store/products/product/${value.id}`,
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
    `${API_DOMAIN}api/guest/orders/order`,
  value,
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('ACCOUNT_TOKEN'),
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
  getAllTypeProduct(){
    return this.http.get<ITypeProductSO>(
      `${API_DOMAIN}unauthentic/type-products`
  ).pipe(
    map(res => {
      console.log(res);
      return res;
    })
  );
  }
  getAllProductByStore(value){
    return this.http.get<IProductSO>(
      `${API_DOMAIN}api/stores/${value}/products`,
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
  getProductByUA(value){
    return this.http.get<IProductSO>(
      `${API_DOMAIN}unauthentic/stores/store/products/product/${value}`
  ).pipe(
    map(res => {
      console.log(res);
      return res;
    })
  );
  }
  
}

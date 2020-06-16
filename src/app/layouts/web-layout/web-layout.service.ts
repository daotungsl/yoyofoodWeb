import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICity } from 'src/app/interfaces/web-client/city-wc.interface';
import { API_DOMAIN, HTTP_HEADER_STORE, HTTP_HEADER_STORE_UPFILE } from 'src/app/shared/constant';
import { map } from 'rxjs/operators';
import { ITypeVoucherSO } from 'src/app/interfaces/shop-owner/voucher-type-so.interface';
import { IAllVoucher } from 'src/app/interfaces/web-client/voucher-all.interface';
import { IInfoSo } from 'src/app/interfaces/shop-owner/Info-so.interface';
import { IVoucherSO } from 'src/app/interfaces/shop-owner/voucher-so.interface';
import { Router, NavigationEnd } from '@angular/router';
import { IAllProduct } from 'src/app/interfaces/web-client/product-all.interface';

@Injectable({
  providedIn: 'root'
})
export class WebLayoutService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }
  
  scrollView(x: number, y: number) {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(x, y);
    });
  }
  getCity(): Observable<ICity> {
    return this.http.get<ICity>(
      `${API_DOMAIN}unauthentic/cities/city`

    ).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }
  getAllCategory(): Observable<ITypeVoucherSO> {
    return this.http.get<ITypeVoucherSO>(
      // `${API_DOMAIN}unauthentic/type-vouchers`
      `${API_DOMAIN}unauthentic/type-products`

    ).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }
  getAllVoucher(): Observable<IAllVoucher> {
    return this.http.get<IAllVoucher>(
      `${API_DOMAIN}unauthentic/stores/store/vouchers`

    ).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }
  getAllProduct(): Observable<IAllProduct> {
    return this.http.get<IAllProduct>(
      `${API_DOMAIN}unauthentic/stores/store/products`

    ).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }
  getInfoStore(value): Observable<IInfoSo> {
    return this.http.get<IInfoSo>(
      `${API_DOMAIN}unauthentic/stores/store/-/${value}`

    ).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }
  getTypeStore(): Observable<any> {
    return this.http.get<any>(
      `${API_DOMAIN}unauthentic/type-stores`

    ).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }
  getAllVoucherByType(value): Observable<IAllVoucher> {
    return this.http.get<IAllVoucher>(
      `${API_DOMAIN}unauthentic/type-vouchers/type-voucher/${value}/vouchers`

    ).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }
  getAllProductByType(value): Observable<IAllProduct> {
    return this.http.get<IAllProduct>(
      `${API_DOMAIN}unauthentic/type-products/type-product/${value}/products`

    ).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }
  postFile(fileToUpload: File): Observable<any> {
    console.log(fileToUpload);
    console.log(HTTP_HEADER_STORE_UPFILE)
    const formData = new FormData();
    formData.append('file', fileToUpload);
    console.log(formData)
    // formData.set('file',fileToUpload,fileToUpload.name);
    console.log(formData.get('file'));
    return this.http.post(
      `${API_DOMAIN}/unauthentic/file/upload`,
      formData,
      {
        headers: HTTP_HEADER_STORE_UPFILE
      }
    ).pipe(
      map(res => {
        console.log(res)
        return res;
      })
    );
  }
}


import {Injectable} from '@angular/core';
import { LoginComponent } from '../pages/login/login.component';
import { IAccount } from '../interfaces/web-client/account-wc.interface';
import { IInfoSo } from '../interfaces/shop-owner/Info-so.interface';
import { IVoucherSO } from '../interfaces/shop-owner/voucher-so.interface';

const ACCOUNT_TOKEN = 'ACCOUNT_TOKEN';
const STORE_TOKEN = 'STORE_TOKEN';
const ACCOUNT = 'ACCOUNT';
const STORE = 'STORE';
const ACCOUNT_STORE = 'ACCOUNT_STORE';
const STORE_VOUCHER_LIST = 'STORE_VOUCHER_LIST';
const STORE_PRODUCT_LIST = 'STORE_PRODUCT_LIST';
const STORE_TYPE_VOUCHER = 'STORE_TYPE_VOUCHER';
const STORE_TYPE_PRODUCT = 'STORE_TYPE_PRODUCT';
const STORE_TYPE = 'STORE_TYPE';
const VOUCHER = 'VOUCHER';
const PRODUCT = 'PRODUCT';
const CART = 'CART';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  setTokenAccount(token: string): void {
    localStorage.setItem(ACCOUNT_TOKEN, token);
    console.log(localStorage.getItem(ACCOUNT_TOKEN));
  }
  setTokenStore(token: string): void {
    localStorage.setItem(STORE_TOKEN, token);
    console.log(localStorage.getItem(STORE_TOKEN));
  }

  setAccount(account: IAccount): void {

    localStorage.setItem(ACCOUNT, JSON.stringify(account));
    console.log(localStorage.getItem(ACCOUNT));
  }
  getAccount(): IAccount{
    return JSON.parse(localStorage.getItem(ACCOUNT));
   }
 
   removeAccount(): void{
     localStorage.removeItem(ACCOUNT);
     console.log(localStorage.getItem(ACCOUNT));
 
   }
   setAccountStore(account: IAccount): void {

    localStorage.setItem(ACCOUNT_STORE, JSON.stringify(account));
    console.log(localStorage.getItem(ACCOUNT_STORE));
  }
  getAccountStore(): IAccount{
    return JSON.parse(localStorage.getItem(ACCOUNT_STORE));
   }
 
   removeAccountStore(): void{
     localStorage.removeItem(ACCOUNT_STORE);
     console.log(localStorage.getItem(ACCOUNT_STORE));
 
   }

  setStore(store: IInfoSo): void {
 
    localStorage.setItem(STORE, JSON.stringify(store));
    console.log(localStorage.getItem(STORE));
  }
  getStore(): IInfoSo{
    return JSON.parse(localStorage.getItem(STORE));
   }
  removeStore(): void{
    localStorage.removeItem(STORE);
    console.log(localStorage.getItem(STORE));

  }

  setVoucher(voucher): void {
    localStorage.setItem(VOUCHER, JSON.stringify(voucher));
    console.log(localStorage.getItem(VOUCHER));
  }
  getVoucher(): any{
    return JSON.parse(localStorage.getItem(VOUCHER));
   }
  removeVoucher(): void{
    localStorage.removeItem(VOUCHER);
    console.log(localStorage.getItem(VOUCHER));

  }

  setProduct(product): void {
    localStorage.setItem(PRODUCT, JSON.stringify(product));
    console.log(localStorage.getItem(PRODUCT));
  }
  getProduct(): any{
    return JSON.parse(localStorage.getItem(PRODUCT));
   }
  removeProduct(): void{
    localStorage.removeItem(PRODUCT);
    console.log(localStorage.getItem(PRODUCT));

  }

  setVoucherList(voucher : any): void {

    localStorage.setItem(STORE_VOUCHER_LIST, JSON.stringify(voucher));
    console.log(localStorage.getItem(STORE_VOUCHER_LIST));
  }
  getVoucherList(): any{
    return JSON.parse(localStorage.getItem(STORE_VOUCHER_LIST));
   }
  removeVoucherList(): void{
    localStorage.removeItem(STORE_VOUCHER_LIST);
    console.log(localStorage.getItem(STORE_VOUCHER_LIST));

  }

  setProductList(voucher : any): void {

    localStorage.setItem(STORE_PRODUCT_LIST, JSON.stringify(voucher));
    console.log(localStorage.getItem(STORE_PRODUCT_LIST));
  }
  getProductList(): any{
    return JSON.parse(localStorage.getItem(STORE_PRODUCT_LIST));
   }
  removeProductList(): void{
    localStorage.removeItem(STORE_PRODUCT_LIST);
    console.log(localStorage.getItem(STORE_PRODUCT_LIST));

  }
  setTypeVoucher(typeVoucher : any): void {

    localStorage.setItem(STORE_TYPE_VOUCHER, JSON.stringify(typeVoucher));
    console.log(localStorage.getItem(STORE_TYPE_VOUCHER));
  }
  getTypeVoucher(): any{
    return JSON.parse(localStorage.getItem(STORE_TYPE_VOUCHER));
   }
  removeTypeVoucher(): void{
    localStorage.removeItem(STORE_TYPE_VOUCHER);
    console.log(localStorage.getItem(STORE_TYPE_VOUCHER));

  }

  setTypeProduct(typeProduct : any): void {

    localStorage.setItem(STORE_TYPE_PRODUCT, JSON.stringify(typeProduct));
    console.log(localStorage.getItem(STORE_TYPE_PRODUCT));
  }
  getTypeProduct(): any{
    return JSON.parse(localStorage.getItem(STORE_TYPE_VOUCHER));
   }
  removeTypeProduct(): void{
    localStorage.removeItem(STORE_TYPE_PRODUCT);
    console.log(localStorage.getItem(STORE_TYPE_PRODUCT));

  }

  setTypeStore(typeStore : any): void {

    localStorage.setItem(STORE_TYPE, JSON.stringify(typeStore));
    console.log(localStorage.getItem(STORE_TYPE));
  }
  getTypeStore(): any{
    return JSON.parse(localStorage.getItem(STORE_TYPE));
   }
  removeTypeStore(): void{
    localStorage.removeItem(STORE_TYPE);
    console.log(localStorage.getItem(STORE_TYPE));
  }

  setCart(typeCart : any): void {
    localStorage.setItem(CART, JSON.stringify(typeCart));
    console.log(localStorage.getItem(CART));
  }
  getCart(): any{
    return JSON.parse(localStorage.getItem(CART));
   }
  removeCart(): void{
    localStorage.removeItem(CART);
    console.log(localStorage.getItem(CART));
  }

  removeToken(): void{
    localStorage.removeItem(ACCOUNT_TOKEN);
    localStorage.removeItem(STORE_TOKEN);

  }

  isLogged() {
    return localStorage.getItem(ACCOUNT_TOKEN) != null;
  }
  isLoggedShop() {
    return localStorage.getItem(STORE_TOKEN) != null;
  }

  isShop(){
    if(localStorage.getItem(ACCOUNT_STORE)){
      return JSON.parse(localStorage.getItem(ACCOUNT_STORE)).data.account.storeId;
    }
    return  null;

  }
}

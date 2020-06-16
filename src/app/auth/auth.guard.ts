import {CanActivate, Router, CanActivateChild} from '@angular/router';
import {Injectable} from '@angular/core';
import {CustomerService} from './customer.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';

@Injectable()
export class NeedAuthGuard implements CanActivate, CanActivateChild {

  constructor(private customerService: CustomerService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const redirectUrl = route['_routerState']['url'];

    if (this.customerService.isLogged() || this.customerService.isLoggedShop()) {
      return true;
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/user/login'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );

    return false;
  }
  canActivateShop(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const redirectUrl = route['_routerState']['url'];

    if(this.customerService.isShop() != -1){
      return true;
    }
    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/shop/add'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );

    return false;
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    route.data;

    const redirectUrl = route['_routerState']['url'];

    if (this.customerService.isShop() != -1) {
      return true;
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/shop/add'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );

    return false;
  }
}

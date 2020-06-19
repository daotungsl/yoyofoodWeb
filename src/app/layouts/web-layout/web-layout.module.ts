import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { WebLayoutRoutes } from './web-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { HeaderWebComponent } from './header-web/header-web.component';
import { BodyWebComponent } from './body-web/body-web.component';
import { FooterWebComponent } from './footer-web/footer-web.component';
import { UserViewModule } from 'src/app/modules/user-view/user-view.module';
import { CardItemVoucherComponent } from './card-item-voucher.component';
import { DetailPageComponent } from 'src/app/modules/user-view/detail-page/detail-page.component';
import { CartPageComponent } from 'src/app/modules/user-view/cart-page/cart-page.component';

@NgModule({

  imports: [
    UserViewModule,
    RouterModule.forChild(WebLayoutRoutes),
    NgbModule,
    ClipboardModule,
    SharedModule,


  ],
    declarations: [
      HeaderWebComponent, 
      BodyWebComponent, 
      FooterWebComponent, 
      CardItemVoucherComponent,
      DetailPageComponent,
      CartPageComponent

  ]
  ,
  exports: [
    HeaderWebComponent, 
    BodyWebComponent, 
    FooterWebComponent,
    CardItemVoucherComponent

  ]
})
export class WebLayoutModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClipboardModule } from 'ngx-clipboard';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductRoutes } from './products.routing';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { CardProductComponent } from './card-product.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductAddComponent } from './product-add/product-add.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ProductRoutes),
    NgbModule,
    ClipboardModule,
  ],
  declarations: [
    ProductComponent,
    ProductAddComponent,
    ProductListComponent,
    CardProductComponent,
    ProductUpdateComponent,
  ]
})

export class ProductModule {}

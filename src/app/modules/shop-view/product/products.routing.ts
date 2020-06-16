import { Routes } from '@angular/router';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductListComponent } from './product-list/product-list.component';



export const ProductRoutes: Routes = [
    { path: 'create',          component: ProductAddComponent },
    { path: 'list',          component: ProductListComponent },
    { path: 'update/:nameProduct',          component: ProductUpdateComponent },
    { path: 'product', redirectTo: 'product/list', pathMatch: 'prefix'},

];

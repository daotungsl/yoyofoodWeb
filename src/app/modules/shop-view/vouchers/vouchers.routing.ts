import { Routes } from '@angular/router';
import { VoucherAddComponent } from './voucher-add/voucher-add.component';
import { VoucherListComponent } from './voucher-list/voucher-list.component';
import { VoucherUpdateComponent } from './voucher-update/voucher-update.component';



export const VoucherRoutes: Routes = [
    { path: 'create',          component: VoucherAddComponent },
    { path: 'list',          component: VoucherListComponent },
    { path: 'update/:nameVoucher',          component: VoucherUpdateComponent },
    { path: 'voucher', redirectTo: 'voucher/list', pathMatch: 'prefix'},

];

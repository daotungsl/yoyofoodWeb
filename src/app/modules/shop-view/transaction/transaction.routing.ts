import { Routes } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';



export const TransactionRoutes: Routes = [
    { path: 'list',          component: TransactionListComponent },
    { path: 'transaction', redirectTo: 'transaction/list', pathMatch: 'prefix'},

];

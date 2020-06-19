import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClipboardModule } from 'ngx-clipboard';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransactionRoutes } from './transaction.routing';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    RouterModule.forChild(TransactionRoutes),
    NgbModule,
    ClipboardModule,
    SharedModule,

  ],
  declarations: [
    TransactionComponent,
    TransactionListComponent,
  ]
})

export class TransactionModule {}

import { Component } from '@angular/core';

@Component({
    selector: 'app-card-voucher',
    template: `
    <div class="card-news" nz-row >

        <div class="row">
            <div class="col-lg-8">
                <div class="card-header">
                    <ng-content select=".card-status"></ng-content>                
                </div>
                
            </div>
        </div>
                
      
      <div nz-row>
            <div>
            <ng-content select=".card-image"></ng-content>
            </div>
           <div>
               <ng-content select=".card-title"></ng-content>
            </div>
            <div nz-col nzSpan="14">
                <ng-content select=".card-description"></ng-content>
            <div class="card-footer ">
                <div>
                 <ng-content  select=".card-author"></ng-content>
                </div>
                <div>
                 <ng-content  select=".card-time-stamp"></ng-content>
                </div>

            </div>
      </div>

    </div>
   
    </div>
    `,
    styleUrls: ['./voucher/voucher.component.scss']
})

export class CardVoucherComponent { }
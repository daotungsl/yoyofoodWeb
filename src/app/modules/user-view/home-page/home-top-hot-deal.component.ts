import { Component } from '@angular/core';

@Component({
    selector: 'app-home-top-hot-deal',
    template: `
  <div>
  <ng-content select=".card-image"></ng-content>
  </div>
  `,
    styleUrls: ['./home-page.component.scss']

})
export class HomeTopHotDealComponent { }

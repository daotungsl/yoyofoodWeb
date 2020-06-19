import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { HomePageComponent } from './home-page/home-page.component';
import { CategoryMainContentComponent } from './categories-page/category-main-content/category-main-content.component';
import { CategoryPageTopComponent } from './categories-page/category-page-top/category-page-top.component';
import { CategoryPageComponent } from './categories-page/category-page/category-page.component';
import { CardItemComponent } from './card-item/card-item.component';
import { HomeTopHotDealComponent } from './home-page/home-top-hot-deal.component';
import { AddDot } from 'src/app/shared/add-dot.pipe';

@NgModule({
  imports: [
    NgbModule,
    RouterModule,
    ClipboardModule,
    SharedModule,

  ],
  declarations: [
    HomePageComponent,
    CategoryPageComponent,
    CategoryPageTopComponent,
    CategoryMainContentComponent,
    CardItemComponent,
    HomeTopHotDealComponent,
    AddDot,

    
  ],
  exports: [
    HomePageComponent,
    CategoryPageComponent,
    CategoryPageTopComponent,
    CategoryMainContentComponent,
    AddDot

  ]

})
export class UserViewModule { }

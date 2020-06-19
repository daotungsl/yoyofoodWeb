import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { CategoryPageRoutes } from './category-page.routing';

@NgModule({

    imports: [
        RouterModule.forChild(CategoryPageRoutes),
        NgbModule,
        ClipboardModule,
        SharedModule,



    ],
    declarations: [
     
    ]
    
})
export class CategoryPageModule { }

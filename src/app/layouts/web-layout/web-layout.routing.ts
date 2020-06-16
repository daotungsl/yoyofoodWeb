import { Routes } from '@angular/router';
import { CategoryPageComponent } from 'src/app/modules/user-view/categories-page/category-page/category-page.component';
import { HomePageComponent } from 'src/app/modules/user-view/home-page/home-page.component';

export const WebLayoutRoutes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'category/:url', component: CategoryPageComponent },

];
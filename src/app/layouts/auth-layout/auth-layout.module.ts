import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterStoreComponent } from 'src/app/pages/register-store/register-store.component';
@NgModule({
  imports: [
    // CommonModule,
    SharedModule,
    RouterModule.forChild(AuthLayoutRoutes),
    // FormsModule
    // NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterStoreComponent
  ]
})
export class AuthLayoutModule { }

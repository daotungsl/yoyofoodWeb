import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LangPipe } from './lang/lang.pipe';
import { AddTimePipePipe } from './add-time-pipe.pipe';



@NgModule({
  declarations: [LangPipe,AddTimePipePipe ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LangPipe,
    AddTimePipePipe
  ]
})
export class SharedModule { }

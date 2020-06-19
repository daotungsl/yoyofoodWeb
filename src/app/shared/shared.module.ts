import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LangPipe } from './lang/lang.pipe';
import { AddTimePipePipe } from './add-time-pipe.pipe';
import { AddDot } from './add-dot.pipe';



@NgModule({
  declarations: [LangPipe,AddTimePipePipe,AddDot ],
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
    AddTimePipePipe,
    AddDot

  ]
})
export class SharedModule { }

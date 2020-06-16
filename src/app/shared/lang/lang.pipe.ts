import { Pipe, PipeTransform } from '@angular/core';
import {LangService} from './lang.service';

@Pipe({
  name: 'lang',
  pure: false
})
export class LangPipe implements PipeTransform {
  constructor(
    private lang: LangService
  ) {
  }
  transform(key: any, ...args: any[]): any {
    return this.lang.tran(key);
  }

}

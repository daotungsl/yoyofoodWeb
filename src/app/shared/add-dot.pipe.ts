import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addDot'
})
export class AddDot implements PipeTransform {
   transform(num) {
    return (
      num
        .toFixed(2) // always two decimal digits
        .replace('.', ',') // replace decimal point character with ,
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + 'đ'
    ) // use . as a separator
  }

}

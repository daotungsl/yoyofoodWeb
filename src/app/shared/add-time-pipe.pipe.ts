import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addTimePipe'
})
export class AddTimePipePipe implements PipeTransform {

  transform(value) {
    let arr = value.split(':')
    if(arr[0] < 13){
     return value+' '+'Sáng'
    }else{
      return value+' '+'Chiều'
    }
    
  }
 
}

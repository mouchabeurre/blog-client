import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdown'
})
export class CountdownPipe implements PipeTransform {

  transform(text: string, args?: any): any {
    let maxLength = args || 0;
    let length = 0;
    if (text !== null) {
      length = text.length;
    }
    return (maxLength - length);
  }

}

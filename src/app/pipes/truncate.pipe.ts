import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number, max: number = 7 * limit): string {
    let tolerance = 0.15;
    let result = value || '';
    let trail = ' [...]';
    if (value) {
      let words = value.split(/\s+/);
      if (words.length > Math.abs(limit)) {
        let max_chars = Math.floor(max + max * tolerance);
        if (words.slice(0, limit).join(' ').length > max_chars) {
          for (let i = limit; i > 0; i--) {
            let actual_chars = words.slice(0, i).join(' ').length;
            if ((actual_chars - words[i].length) < max_chars) {
              let tmp = words.slice(0, i);
              tmp.push(words[i].slice(0, Math.floor(max_chars - actual_chars)));
              result = tmp.join(' ');
              break;
            }
          }
        } else {
          result = words.slice(0, limit + 1).join(' ')
        }
      }
    }
    return result + trail;
  }

}

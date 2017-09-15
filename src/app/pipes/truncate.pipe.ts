import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number, max_chars: number = 7 * limit): string {
    let result = value || '';
    let trail = ' [...]';
    if (value.length > max_chars) {
      let words = value.split(/\s+/);
      for (let i = 1; i < words.length + 1; i++) {
        let actual_chars = words.slice(0, i).join(' ').length;
        if (actual_chars > max_chars) {
          if (i == 1) {
            result = words[i - 1].slice(0, max_chars);
          } else {
            let fit_words = words.slice(0, i - 1);
            if (i < limit) {
              fit_words.push(words[i - 1].slice(0, max_chars - fit_words.length));
            }
            result = fit_words.join(' ');
            break;
          }
        }
      }
    }
    return result + trail;
  }

}

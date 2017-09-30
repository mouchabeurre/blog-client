import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeago'
})
export class TimeagoPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    const suffix = ' ago';
    let prefix = '';
    const now = new Date();
    const past = new Date(value);

    const seconds = Math.round(Math.abs((now.getTime() - past.getTime()) / 1000));
    const minutes = Math.round(Math.abs(seconds / 60));
    const hours = Math.round(Math.abs(minutes / 60));
    const days = Math.round(Math.abs(hours / 24));
    const months = Math.round(Math.abs(days / 30.416));
    const years = Math.round(Math.abs(days / 365));
    // console.log(years, ' years', months, ' months', days, ' days', hours, ' hours', minutes, ' minutes', seconds, ' seconds');

    if (seconds <= 45) {
      prefix = 'a few seconds';
    } else if (seconds <= 90) {
      prefix = 'a minute';
    } else if (minutes <= 45) {
      prefix = minutes + ' minutes';
    } else if (minutes <= 90) {
      prefix = 'an hour';
    } else if (hours <= 22) {
      prefix = hours + ' hours';
    } else if (hours <= 36) {
      prefix = 'a day';
    } else if (days <= 25) {
      prefix = days + ' days';
    } else if (days <= 45) {
      prefix = 'a month';
    } else if (days <= 345) {
      prefix = months + ' months';
    } else if (days <= 545) {
      prefix = 'a year';
    } else { // (days > 545)
      prefix = years + ' years';
    }

    return prefix + suffix;
  }

}

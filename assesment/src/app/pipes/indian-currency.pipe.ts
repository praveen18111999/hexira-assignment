import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indianCurrency',
  standalone: true  // This makes the pipe standalone
})
export class IndianCurrencyPipe implements PipeTransform {
  transform(value: number, decimalLength: number = 2): string {
    if (isNaN(value)) {
      return '';
    }

    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: decimalLength,
      maximumFractionDigits: decimalLength
    }).format(value);
  }
}

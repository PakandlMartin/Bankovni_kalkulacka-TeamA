import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appIdValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: IdValidatorDirective, multi: true },
  ],
})
export class IdValidatorDirective {
  validate(control: AbstractControl): { [key: string]: any } {
    if (control.value === null) {
      return { idNotValid: true };
    } else {
      const isValid = this.validateID(control.value);

      return isValid ? null : { idNotValid: true };
    }
  };

  validateID = (input) => {
    const inputArray = input.split('');

    const filteredNum = inputArray
      .filter((num) => {
        return Number(num) >= 0;
      })
      .map((num) => {
        return Number(num);
      });

    const monthsNumber = filteredNum.slice(2, 4).join('');
    const daysNumber = filteredNum.slice(4, 6).join('');
    const boolMonths =
      (monthsNumber >= 1 && monthsNumber <= 12) ||
      (monthsNumber >= 50 && monthsNumber <= 62);
    const boolDays = daysNumber >= 1 && daysNumber <= 31;

    if (filteredNum.length === 10 && boolMonths && boolDays) {
      const oddNumbers = [];
      const evenNumbers = [];

      for (let i = 0; i < filteredNum.length; i++) {
        if (i % 2 === 0) {
          evenNumbers.push(filteredNum[i]);
        } else {
          oddNumbers.push(filteredNum[i]);
        }
      }

      const reducedOddNumbers = oddNumbers.reduce((prev, next) => {
        return prev + next;
      }, 0);

      const reducedEvenNumbers = evenNumbers.reduce((prev, next) => {
        return prev + next;
      }, 0);

      const result =
      Math.abs(reducedEvenNumbers - reducedOddNumbers) === 11 
      || (reducedEvenNumbers - reducedOddNumbers) === 0
      || oddNumbers[oddNumbers.length - 1] === 0;

      return result;
    }

    if (filteredNum.length === 9 && boolMonths && boolDays) {
      const lastThreeNumbers = filteredNum.slice(6, 9).join('');
      const result = lastThreeNumbers != '000';

      return result;
    } else {
      return false;
    }
  };
}

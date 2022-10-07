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
  }

  validateID = (input) => {
    // make array from string
    const inputArray = input.split('');
    // take every number in inputArray, parse it and store it in new array
    const filteredNum = inputArray
      .filter((num) => {
        return Number(num) >= 0;
      })
      .map((num) => {
        return Number(num);
      });
      // first two numbers - years
    const yearsNumber = filteredNum.slice(0, 2).join('');
    // 2 - 4 numbers - months
    const monthsNumber = filteredNum.slice(2, 4).join('');
    // 4 - 6 numbers - days
    const daysNumber = filteredNum.slice(4, 6).join('');
    // validate months
    const boolMonths =
    // men
      (monthsNumber >= 1 && monthsNumber <= 12) ||
      // women
      (monthsNumber >= 50 && monthsNumber <= 62);
      // validate days
    const boolDays = daysNumber >= 1 && daysNumber <= 31;

    // if ID has 10 numbers, months and days are true
    if (filteredNum.length === 10 && boolMonths && boolDays) {
      const oddNumbers = [];
      const evenNumbers = [];

// for loop - take every number in filteredNum
      for (let i = 0; i < filteredNum.length; i++) {
        if (i % 2 === 0) {
          // if index is even, push number to evenNumber array
          evenNumbers.push(filteredNum[i]);
        } else {
                // if index is odd, push number to evenNumber array
          oddNumbers.push(filteredNum[i]);
        }
      }
// summ of odd numbers
      const reducedOddNumbers = oddNumbers.reduce((prev, next) => {
        return prev + next;
      }, 0);
// sum of even numbers
      const reducedEvenNumbers = evenNumbers.reduce((prev, next) => {
        return prev + next;
      }, 0);
// validate difference between odd and even numbers
      const result =
      // if difference is 11 or -11
        Math.abs(reducedEvenNumbers - reducedOddNumbers) === 11 ||
      // if difference is 0 
        reducedEvenNumbers - reducedOddNumbers === 0 ||
        // if last number of ID is 0
        oddNumbers[oddNumbers.length - 1] === 0;

      return result;
    }

    // if ID has onlny 9 numbers and months, days and years are true
    if (
      filteredNum.length === 9 &&
      boolMonths &&
      boolDays &&
      yearsNumber < '54'
    ) {
      // take last 3 numbers of ID
      const lastThreeNumbers = filteredNum.slice(6, 9).join('');
      // if the last 3 numbers of ID are not 000
      const result = lastThreeNumbers != '000';

      return result;
    } else {
      return false;
    }
  };
}

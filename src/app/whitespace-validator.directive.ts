import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appWhitespaceValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: WhitespaceValidatorDirective, multi: true}]
})
export class WhitespaceValidatorDirective {

  validate(control: AbstractControl): {[key: string]: any} {
    const isValid = !control.value || (!control.value.startsWith(' ') && !control.value.endsWith(' '));
    return isValid ? null : { 'whitespace' : true}
  }

}

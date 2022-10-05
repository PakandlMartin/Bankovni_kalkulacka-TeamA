import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';

import { UserInfoService } from '../user-info.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-calculation',
  templateUrl: './form-calculation.component.html',
  styleUrls: ['./form-calculation.component.css'],
})
export class FormCalculationComponent implements DoCheck {
  amountInput: number = 500000;
  

  numOfMOnthsInput: number = 30;
  btnActive: boolean = false;
  calculationInputs = {
    amount: 0,
    numOfMonths: 0,
  };

  calculationOutput = {
    monthlyPayment: 0,
    yearlyInterest: 0,
    RPSN: 0,
    overallAmount: 0,
    fixedFee: 0,
  };

  requestCalc: any;
  amountOfMoney: any;
  numOfMonthsNg: any;

  constructor(
    private httpRequestsService: HttpRequestsService,
    private userInfoService: UserInfoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngDoCheck() {
    this.requestCalc = this.httpRequestsService.calculationInfo;
    this.amountOfMoney = this.amountInput;
    this.numOfMonthsNg = this.numOfMOnthsInput;
  }

  calculate(amountCalculate, numOfMonthsCalculate) {
    this.calculationInputs.amount = Number(amountCalculate);
    this.calculationInputs.numOfMonths = Number(numOfMonthsCalculate);

    this.userInfoService.calculationInformation.amount =
      Number(amountCalculate);
    this.userInfoService.calculationInformation.numOfMonths =
      Number(numOfMonthsCalculate);

    this.router.navigate(['/form'], { relativeTo: this.route });
  }

  changeOfAmount(amountChange) {
    this.amountInput = Number(amountChange.target.value);
    this.calculationInputs.amount = Number(this.amountInput);
    this.changeBtnActive();
    this.httpRequestsService.postCalculationInfo(this.calculationInputs);
  }

  changeAmountRange(amountChangeRange) {
    this.amountInput = Number(amountChangeRange.target.value);
    this.calculationInputs.amount = Number(this.amountInput);
    this.changeBtnActive();
    this.httpRequestsService.postCalculationInfo(this.calculationInputs);
  }

  changeOfNumOfMonths(numChange) {
    this.numOfMOnthsInput = Number(numChange.target.value);
    this.calculationInputs.numOfMonths = Number(this.numOfMOnthsInput);
    this.changeBtnActive();
    this.httpRequestsService.postCalculationInfo(this.calculationInputs);
  }

  changeOfNumOfMonthsRange(numOfMonthsRange) {
    this.numOfMOnthsInput = Number(numOfMonthsRange.target.value);
    this.calculationInputs.numOfMonths = Number(this.numOfMOnthsInput);
    this.changeBtnActive();
    this.httpRequestsService.postCalculationInfo(this.calculationInputs);
  }

  changeBtnActive() {
    if (this.amountInput && this.numOfMOnthsInput) {
      this.btnActive = true;
    } else {
      this.btnActive = false;
    }
  }

  numberWithSpaces(numberInput: number) {
    return numberInput
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      .toString();
  }
}

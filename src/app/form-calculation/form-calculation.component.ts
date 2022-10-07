import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';

import { UserInfoService } from '../user-info.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-calculation',
  templateUrl: './form-calculation.component.html',
  styleUrls: ['./form-calculation.component.css'],
})
export class FormCalculationComponent  {
  amountInput: number = 500000;
  numOfMOnthsInput: number = 50;
  btnActive: boolean = false;
  calculationInputs = {
    amount: this.amountInput,
    numOfMonths: this.numOfMOnthsInput,
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

  ngOnInit(): void {
    this.amountOfMoney = this.amountInput;
    this.numOfMonthsNg = this.numOfMOnthsInput;
    this.refreshCalculationInfoFromAPI()
  }

  refreshCalculationInfoFromAPI() {
    this.httpRequestsService.postCalculationInfo(this.calculationInputs)
    .subscribe(
      responseData => {
        this.requestCalc = responseData.body;
      })
  }

  calculate(amountCalculate, numOfMonthsCalculate) {
    this.calculationInputs.amount = Number(amountCalculate);
    this.calculationInputs.numOfMonths = Number(numOfMonthsCalculate);

    this.userInfoService.calculationInformation.amount =
      Number(amountCalculate);
    this.userInfoService.calculationInformation.numOfMonths =
      Number(numOfMonthsCalculate);
const calculationToLocalStorage  = {...this.calculationInputs, ...this.requestCalc}
    localStorage.setItem('infoFromCalculation', JSON.stringify(calculationToLocalStorage))


    this.router.navigate(['/form'], { relativeTo: this.route });
  }

  changeOfAmount(amountChange) {
    this.amountInput = Number(amountChange.target.value);
    this.calculationInputs.amount = Number(this.amountInput);
    this.changeBtnActive();
    this.refreshCalculationInfoFromAPI()
  }

  changeAmountRange(amountChangeRange) {
    this.amountInput = Number(amountChangeRange.target.value);
    this.calculationInputs.amount = Number(this.amountInput);
    this.changeBtnActive();
    this.refreshCalculationInfoFromAPI()
  }

  changeOfNumOfMonths(numChange) {
    this.numOfMOnthsInput = Number(numChange.target.value);
    this.calculationInputs.numOfMonths = Number(this.numOfMOnthsInput);
    this.changeBtnActive();
    this.refreshCalculationInfoFromAPI()
  }

  changeOfNumOfMonthsRange(numOfMonthsRange) {
    this.numOfMOnthsInput = Number(numOfMonthsRange.target.value);
    this.calculationInputs.numOfMonths = Number(this.numOfMOnthsInput);
    this.changeBtnActive();
    this.refreshCalculationInfoFromAPI()
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

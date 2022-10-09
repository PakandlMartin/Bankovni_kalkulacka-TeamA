import { Component, OnInit} from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';

import { UserInfoService } from '../user-info.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-calculation',
  templateUrl: './form-calculation.component.html',
  styleUrls: ['./form-calculation.component.css'],
})
export class FormCalculationComponent implements OnInit {
  // first amount of money in input
  amountInput: number = 500000;
  // first number of months in input
  numOfMOnthsInput: number = 50;
  // btn is true, if at least one input is touched by user
  btnActive: boolean = false;
  // send to API - this.httpRequestsService.postCalculationInfo
  calculationInputs = {
    amount: this.amountInput,
    numOfMonths: this.numOfMOnthsInput,
  };

  // object for information about loan getting from API (monthlyPayment, overallAmount etc. )
  requestCalc: any;
  // for ng purposes - display changes in amounts inputs
  amountOfMoney: any;
  // for ng purposes - display changes in months inputs
  numOfMonthsNg: any;

  // booleans for warning messages
rightAmount: boolean = true;
rightNumOfMonths: boolean = true;

  constructor(
    private httpRequestsService: HttpRequestsService,
    private userInfoService: UserInfoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get first values to inputs
    this.amountOfMoney = this.amountInput;
    this.numOfMonthsNg = this.numOfMOnthsInput;
  }

  // send data to API, get values and store them in object
  refreshCalculationInfoFromAPI() {
    this.httpRequestsService
      .postCalculationInfo(this.calculationInputs)
      .subscribe((responseData) => {
        this.requestCalc = responseData.body;
      });
  }

  // for submit button in the end
  calculate(amountCalculate, numOfMonthsCalculate) {
    // store data from input in variable (amount)
    this.calculationInputs.amount = Number(amountCalculate);
       // store data from input in variable (months)
    this.calculationInputs.numOfMonths = Number(numOfMonthsCalculate);
    // send data from input to service
    this.userInfoService.calculationInformation.amount =
      Number(amountCalculate);
  // send data from input to service
    this.userInfoService.calculationInformation.numOfMonths =
      Number(numOfMonthsCalculate);
// object of all information about loan - from user and API
    const calculationToLocalStorage = {
      ...this.calculationInputs,
      ...this.requestCalc,
    };
    // storing information about loan to localStorage
    localStorage.setItem(
      'infoFromCalculation',
      JSON.stringify(calculationToLocalStorage)
    );
// navigate to form
    this.router.navigate(['/form'], { relativeTo: this.route });
  }

  // event handler - change of amount (text)
  changeOfAmount(amountChange) {
    if (Number(amountChange.target.value) < 5000 || Number(amountChange.target.value) > 1200000 ) {
      this.rightAmount = false
      this.amountInput = Number(amountChange.target.value) < 5000 ? 5000 : 1200000;
    } else {
      this.amountInput = Number(amountChange.target.value);
      this.calculationInputs.amount = Number(this.amountInput);
      this.rightAmount = true;
    }
      this.changeBtnActive();
      this.refreshCalculationInfoFromAPI();
  }



  // event handler - change of amount (range)
  changeAmountRange(amountChangeRange) {
    this.amountInput = Number(amountChangeRange.target.value);
    this.calculationInputs.amount = Number(this.amountInput);
    this.changeBtnActive();
    this.refreshCalculationInfoFromAPI();
    this.rightAmount = true;
  }

   // event handler - change of months (text)
  changeOfNumOfMonths(numChange) {
    if (Number(numChange.target.value) < 6 || Number(numChange.target.value) > 60) {
      this.rightNumOfMonths = false;
      this.numOfMOnthsInput = Number(numChange.target.value) < 6 ? 6 : 60;
    } else {
      this.numOfMOnthsInput = Number(numChange.target.value);
      this.calculationInputs.numOfMonths = Number(this.numOfMOnthsInput);
      this.rightNumOfMonths = true;
    }
    this.changeBtnActive();
    this.refreshCalculationInfoFromAPI();
  }
 // event handler - change of months (range)
  changeOfNumOfMonthsRange(numOfMonthsRange) {
    this.numOfMOnthsInput = Number(numOfMonthsRange.target.value);
    this.calculationInputs.numOfMonths = Number(this.numOfMOnthsInput);
    this.changeBtnActive();
    this.refreshCalculationInfoFromAPI();
    this.rightNumOfMonths = true;
  }

  // if one of the input is touched, btn is active
  changeBtnActive() {
    if (this.amountInput && this.numOfMOnthsInput) {
      this.btnActive = true;
    } else {
      this.btnActive = false;
    }
  }
// changing format of numbers to more readable one
  numberWithSpaces(numberInput: number) {
    return numberInput
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      .toString();
  }
}

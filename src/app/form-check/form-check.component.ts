import { Component, DoCheck, OnInit } from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';


@Component({
  selector: 'app-form-check',
  templateUrl: './form-check.component.html',
  styleUrls: ['./form-check.component.css'],
})
export class FormCheckComponent implements OnInit, DoCheck {
  // variable for information about user from localStorage
  infoAboutUserFromAPI = null;
  changeActive: boolean = false;
  confirmBtnActive: boolean = false;
  amountInput: number;
  numOfMonthsInput: number;
  calculationInputs: any;

rightAmount: boolean = true;
rightNumOfMonths: boolean = true;
 

  constructor(private httpRequestsService: HttpRequestsService) {}

  ngOnInit(): void {
    this.infoAboutUserFromAPI = JSON.parse(localStorage.getItem('userInfoAPI'));
    this.amountInput = this.infoAboutUserFromAPI.amount;
    this.numOfMonthsInput = this.infoAboutUserFromAPI.numOfMonths
    this.calculationInputs = {
      amount: this.amountInput,
      numOfMonths: this.numOfMonthsInput,
      id: this.infoAboutUserFromAPI.id
    };
  }

  changeActiveSubmit() {
this.changeActive = true;
this.confirmBtnActive = true
  }

  confirmChange() {
    console.log("změna")
    console.log(this.calculationInputs);
    this.httpRequestsService.changeCalculation(this.calculationInputs)
    this.changeActive = false;
    this.confirmBtnActive = false;

    this.httpRequestsService
    .getInfoAboutUserFromApi(this.infoAboutUserFromAPI.id)
    // get data from API
    .subscribe((responseData) => {
      // store data from API about user to localStorage
        localStorage.setItem(
          'userInfoAPI',
          JSON.stringify(responseData.body)
        );
   
     // if ID is not in database
    } , (error) => {
       console.error(error);
      });

  }

  changeOfAmount(event) {
    if (Number(event.target.value) < 5000 || Number(event.target.value) > 1200000) {
      this.rightAmount = false;
    }
    else {
      this.amountInput = event.target.value;
      this.calculationInputs.amount = 
      Number(event.target.value )
      this.rightAmount = true;
    }
    
  }

  changeOfNumOfMonths(event) {
    if (Number(event.target.value) < 6 || Number(event.target.value) > 60) {
this.rightNumOfMonths = false;
    } else {
      this.numOfMonthsInput = event.target.value;
      this.calculationInputs.numOfMonths = 
      Number(event.target.value)
      this.rightNumOfMonths = true
    }
  
  }


  ngDoCheck(): void {
    // store data about user from localstorage to object - for template
    this.infoAboutUserFromAPI = JSON.parse(localStorage.getItem('userInfoAPI'));


    
  }

   // changing format of numbers to more readable one
  numberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}

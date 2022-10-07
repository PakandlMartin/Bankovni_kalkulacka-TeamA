import { Component, DoCheck, OnInit } from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';
import { UserInfoService } from '../user-info.service';
import { ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.css'],
})
export class FormContactComponent implements OnInit {
  constructor(
    private httpRequestsService: HttpRequestsService,
    private userInfoService: UserInfoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
   // store amount of money from calculation in client object
    this.client.amount = this.userInfoService.calculationInformation.amount;
    // store num of months from calculation in client object
    this.client.numOfMonths =
    this.userInfoService.calculationInformation.numOfMonths;
  }
// way to get informations about form from template
  @ViewChild('f') signUpForm: NgForm;
// default selectedType for ngModel
  selectedType = 'INDIVIDUAL';
  // variable for error message from server (this.httpRequestsService.postInfoAboutUser)
  errorMessage: string = '';

// function for validation input from template 
  getValidation(errorsForm: any) {
    // validation for minlength
    if (errorsForm.errors['minlength']) {
      return `Alespoň ${errorsForm.errors?.['minlength'].requiredLength} 
      ${
        errorsForm.errors?.['minlength'].requiredLength <= 4 ? 'znaky' : 'znaků'
      } `;
    // validation for pattern
    } else if (errorsForm.errors['pattern'] || errorsForm.errors['email']) {
      return 'Neodpovídající formát';
    // validation for required
    } else if (errorsForm.errors['required'] || !errorsForm.value.trim().length ) {
      return 'Pole je povinné';
    // validation for valid ID
    } else if (errorsForm.errors['idNotValid']) {
      return 'Neplatné rodné číslo';
    } else {
      return '';
    }
  }

  // object for all information about client 
  client = {
    applicantType: '',
    name: '',
    surname: '',
    birthNum: '',
    nationality: '',
    email: '',
    phone: '',
    IC: '',
    position: '',
    companyName: '',
    amount: 0,
    numOfMonths: 0,
    address: {
      street: '',
      descNumber: 0,
      indicativeNumber: 0,
      city: '',
      postalCode: 0,
    },
  };

  // signing info about client from template form to object
  signValuesFromInputs() {
    this.client.applicantType = this.signUpForm.value.applicantType;
    this.client.name = this.signUpForm.value.name.trim();
    this.client.companyName = this.signUpForm.value.companyName;
    this.client.surname = this.signUpForm.value.surname.trim();
    this.client.birthNum = this.signUpForm.value.birthNum;
    this.client.nationality = this.signUpForm.value.nationality;
    this.client.email = this.signUpForm.value.email.trim();
    this.client.phone = this.signUpForm.value.phone.trim();
    this.client.IC = this.signUpForm.value.IC;
    this.client.position = this.signUpForm.value.position;
    this.client.address.street = this.signUpForm.value.street;
    this.client.address.descNumber = Number(this.signUpForm.value.descNumber);
    this.client.address.indicativeNumber = Number(
      this.signUpForm.value.indicativeNumber
    );
    this.client.address.city = this.signUpForm.value.city;
    this.client.address.postalCode = Number(this.signUpForm.value.postalCode);
  }

  // event handler - for submit button
  onSubmit() {
     // signing info about client from template form to object
    this.signValuesFromInputs();
// if form is valid
    if (this.signUpForm.valid) {
      // send data about user to API
      this.httpRequestsService.postInfoAboutUser(this.client).subscribe(
        (responseData) => {
          // store data from API to service
          this.userInfoService.infoAboutUser = responseData.body;
          // store data from API to localStorage
          localStorage.setItem('userInfo', JSON.stringify(responseData.body));
          // after click navigate to form-details
          this.router.navigate(['form-details/' + responseData.body.id], {
            relativeTo: this.route,
          });
        },
        (error) => {
          // if there is a error, display it in template
          this.errorMessage =
            'Testovací chyba ze serveru - sudé číslo u čísla popisného';
          console.error(error);
        }
      );
    }
  }

}

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
export class FormContactComponent implements DoCheck, OnInit {
  ngDoCheck(): void {
    this.client.amount = this.userInfoService.calculationInformation.amount;
    this.client.numOfMonths =
      this.userInfoService.calculationInformation.numOfMonths;
  }

  constructor(
    private httpRequestsService: HttpRequestsService,
    private userInfoService: UserInfoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  @ViewChild('f') signUpForm: NgForm;

  idCreated = false;
  selectedType = 'INDIVIDUAL';
  example = "nothing"



  getValidation(errorsForm: any) {

  if (errorsForm.errors['minlength']) {
    return `Alespoň ${
      errorsForm.errors?.['minlength'].requiredLength} 
      ${errorsForm.errors?.['minlength'].requiredLength <= 4 ? 'znaky' : 'znaků'} `
  } else if (errorsForm.errors['pattern'] || errorsForm.errors['email'])  {
    return 'Neodpovídající formát'
  } else if (errorsForm.errors['required']) {
    return 'Pole je povinné'
  } else if (!errorsForm.value.trim().length) {
    return 'Pole je povinné'
  } else if (errorsForm.errors['idNotValid']) {
    return 'Neplatné rodné číslo'
  } 
  else {
    return ''
  }
}


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

  signValuesFromInputs() {
    this.client.applicantType = this.signUpForm.value.applicantType;
    this.client.name = this.signUpForm.value.name.trim();
    this.client.companyName = this.signUpForm.value.companyName;
    this.client.surname = this.signUpForm.value.surname.trim();
    this.client.birthNum = this.signUpForm.value.birthNum.trim();
    this.client.nationality = this.signUpForm.value.nationality.trim();
    this.client.email = this.signUpForm.value.email.trim();
    this.client.phone = this.signUpForm.value.phone.trim();
    this.client.IC = this.signUpForm.value.IC;
    this.client.position = this.signUpForm.value.position;
    this.client.address.street = this.signUpForm.value.street.trim();
    this.client.address.descNumber = Number(this.signUpForm.value.descNumber);
    this.client.address.indicativeNumber = Number(
      this.signUpForm.value.indicativeNumber
    );
    this.client.address.city = this.signUpForm.value.city.trim();
    this.client.address.postalCode = Number(this.signUpForm.value.postalCode);
  }

  onSubmit() {
    this.signValuesFromInputs();

    if (this.signUpForm.valid) {
      this.httpRequestsService
        .postInfoAboutUser(this.client)
        .subscribe((responseData) => {
          this.userInfoService.infoAboutUser = responseData.body;
          localStorage.setItem('userInfo', JSON.stringify(responseData.body));

          this.router.navigate(['form-details/' + responseData.body.id], {
            relativeTo: this.route,
          });
        });
    }
  }

  displayF() {
    console.log(this.signUpForm.form.controls?.['birthNum']);
  }
}


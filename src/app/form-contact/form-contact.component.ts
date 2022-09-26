import { Component, DoCheck, OnInit } from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';
import { UserInfoService } from '../user-info.service';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  idCreated = false;
  selectedType = 'INDIVIDUAL';

  @ViewChild('f') signUpForm: NgForm;

  client = {
    applicantType: undefined,
    name: undefined,
    surname: undefined,
    birthNum: undefined,
    nationality: undefined,
    email: undefined,
    phone: undefined,
    IC: undefined,
    position: undefined,
    companyName: undefined,
    amount: undefined,
    numOfMonths: undefined,
    address: {
      street: undefined,
      descNumber: undefined,
      indicativeNumber: undefined,
      city: undefined,
      postalCode: undefined,
    },
  };

  signValuesFromInputs() {
    this.client.applicantType = this.signUpForm.value.applicantType;
    this.client.name = this.signUpForm.value.name;
    this.client.companyName = this.signUpForm.value.companyName;
    this.client.surname = this.signUpForm.value.surname;
    this.client.birthNum = this.signUpForm.value.birthNum;
    this.client.nationality = this.signUpForm.value.nationality;
    this.client.email = this.signUpForm.value.email;
    this.client.phone = this.signUpForm.value.phone;
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

  onSubmit() {
    this.signValuesFromInputs();
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

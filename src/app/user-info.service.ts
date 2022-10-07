import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {


  calculationInformation = JSON.parse(localStorage.getItem('infoFromCalculation'));

  infoAboutUser = {
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
  constructor() {}
}

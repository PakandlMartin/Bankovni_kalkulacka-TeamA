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

  constructor(private httpRequestsService: HttpRequestsService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    // store data about user from localstorage to object - for template
    this.infoAboutUserFromAPI = JSON.parse(localStorage.getItem('userInfoAPI'));
  }

   // changing format of numbers to more readable one
  numberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}

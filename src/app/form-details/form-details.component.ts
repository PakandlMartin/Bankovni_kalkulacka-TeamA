import { Component, DoCheck, OnInit } from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';
import { UserInfoService } from '../user-info.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css'],
})
export class FormDetailsComponent implements OnInit, DoCheck {

  constructor(private httpRequestsService: HttpRequestsService) {}

  // variable for information about user - using in template
  infoAboutUserFromAPI: any = null;
  // get info about calculation from localStorage
  infoCalculateFromLocaleStorage = localStorage.getItem('infoFromCalculation');
  // get info about user form from localStorage
  infoAboutUserAPILocaleStorage = localStorage.getItem('userInfo');

  // changing format of numbers to more readable one
  numberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  // 
  ngOnInit(): void {
    this.httpRequestsService.getInfoAboutUser(
      JSON.parse(this.infoAboutUserAPILocaleStorage).id
    );
  }
  ngDoCheck(): void {
    this.infoAboutUserFromAPI = {
      ...JSON.parse(this.infoCalculateFromLocaleStorage),
      ...JSON.parse(this.infoAboutUserAPILocaleStorage)
    };

  }
}

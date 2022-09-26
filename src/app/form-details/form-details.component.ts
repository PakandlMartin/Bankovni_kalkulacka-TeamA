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
  requestCalc;

  infoCalculateFromLocaleStorage = localStorage.getItem('userInfoCalculation');

  infoAboutUserAPILocaleStorage = localStorage.getItem('userInfo');

  constructor(private httpRequestsService: HttpRequestsService) {}

  infoAboutUserFromAPI = null;
  idParam;

  numberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  ngOnInit(): void {
    this.httpRequestsService.getInfoAboutUser(
      JSON.parse(this.infoAboutUserAPILocaleStorage).id
    );
  }

  ngDoCheck(): void {
    this.infoAboutUserFromAPI = {
      ...JSON.parse(this.infoAboutUserAPILocaleStorage),
      ...JSON.parse(this.infoCalculateFromLocaleStorage),
    };

    this.idParam = this.infoAboutUserFromAPI.id;
  }
}

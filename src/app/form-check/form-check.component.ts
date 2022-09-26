import { Component, DoCheck, OnInit } from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';


@Component({
  selector: 'app-form-check',
  templateUrl: './form-check.component.html',
  styleUrls: ['./form-check.component.css'],
})
export class FormCheckComponent implements OnInit, DoCheck {
  infoAboutUserFromAPI = null;
  infoAboutUserFromLocaleStorage: any;

  constructor(private httpRequestsService: HttpRequestsService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.infoAboutUserFromAPI = JSON.parse(localStorage.getItem('userInfoAPI'));
  }

  numberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}

import { Component, DoCheck, OnInit } from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


@Component({
  selector: 'app-form-check',
  templateUrl: './form-check.component.html',
  styleUrls: ['./form-check.component.css']
})
export class FormCheckComponent implements OnInit, DoCheck {

  infoAboutUserFromAPI = null;
  infoAboutUserFromLocaleStorage: any;
  

  constructor(private httpRequestsService: HttpRequestsService) { }

  ngOnInit(): void {
  
    // this.httpRequestsService.getInfoAboutUserFromApi(JSON.parse(this.infoAboutUserFromLocaleStorage).id);
    
  }
  
  ngDoCheck(): void {


    
  this.infoAboutUserFromAPI = JSON.parse(localStorage.getItem("userInfoAPI"))

  // console.log(JSON.parse(this.infoAboutUserFromLocaleStorage))

      // this.infoAboutUserFromAPI = {...this.httpRequestsService.infoAboutUserFromApi};
  }
  

  numberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

}





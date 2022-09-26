import { Component, DoCheck, OnInit } from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';
import { UserInfoService } from '../user-info.service';



@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css']
})
export class FormDetailsComponent implements OnInit, DoCheck {

  requestCalc;

  constructor(private userInfoService: UserInfoService, private httpRequestsService: HttpRequestsService) { }

  infoAboutUserFromAPI = null;

  displayClick() {
    console.log(this.userInfoService.infoAboutUser.name)
    console.log(this.infoAboutUserFromAPI)
  }
  
  ngOnInit(): void {
  }


  

  ngDoCheck(): void {
    this.infoAboutUserFromAPI = {
      ...this.userInfoService.infoAboutUser, 
      ...this.httpRequestsService.calculationInfo};
  }

}

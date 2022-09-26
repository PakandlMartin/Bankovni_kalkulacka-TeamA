import { Component, DoCheck, OnInit } from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';
import { UserInfoService } from '../user-info.service';


@Component({
  selector: 'app-form-check',
  templateUrl: './form-check.component.html',
  styleUrls: ['./form-check.component.css']
})
export class FormCheckComponent implements OnInit, DoCheck {

  infoAboutUserFromAPI = null;

  constructor(private httpRequestsService: HttpRequestsService) { }

  ngOnInit(): void {
  }
  
  ngDoCheck(): void {
    this.infoAboutUserFromAPI = {...this.httpRequestsService.infoAboutUser}
  }
  
  clickFun() {
    console.log(this.httpRequestsService.infoAboutUser)
    console.log(this.infoAboutUserFromAPI) 
  }

}





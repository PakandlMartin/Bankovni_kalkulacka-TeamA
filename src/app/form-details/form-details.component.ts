import { Component, DoCheck, OnInit } from '@angular/core';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css']
})
export class FormDetailsComponent implements OnInit, DoCheck {

  constructor(private userInfoService: UserInfoService) { }

  infoAboutUserFromAPI = null;




  displayClick() {
    console.log(this.userInfoService.infoAboutUser.name)
    console.log(this.infoAboutUserFromAPI)
  
  }
  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.infoAboutUserFromAPI = this.userInfoService.infoAboutUser
  }

}

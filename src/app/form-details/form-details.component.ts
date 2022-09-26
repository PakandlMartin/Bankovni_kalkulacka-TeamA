import { Component, DoCheck, OnInit } from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';
import { UserInfoService } from '../user-info.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css']
})
export class FormDetailsComponent implements OnInit, DoCheck {

  requestCalc;

  infoCalculateFromLocaleStorage = localStorage.getItem("userInfoCalculation");

  infoAboutUserAPILocaleStorage = localStorage.getItem("userInfo")

  constructor(private userInfoService: UserInfoService, private httpRequestsService: HttpRequestsService, private route: ActivatedRoute, private router: Router) { }

  infoAboutUserFromAPI = null;
  idParam;

  displayClick() {
    console.log(this.userInfoService.infoAboutUser.name)
    console.log(this.infoAboutUserFromAPI)
  }

  numberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  
  ngOnInit(): void {

console.log( this.httpRequestsService.getInfoAboutUser(JSON.parse(this.infoAboutUserAPILocaleStorage).id))
    this.httpRequestsService.getInfoAboutUser(JSON.parse(this.infoAboutUserAPILocaleStorage).id);

  //   this.router.navigate(['form-details/' + 88
  // ], {relativeTo: this.route});


    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   +params.get('2525')
    // })
  }
  
  ngDoCheck(): void {
    this.infoAboutUserFromAPI = {
      ...JSON.parse(this.infoAboutUserAPILocaleStorage), 
      ...JSON.parse(this.infoCalculateFromLocaleStorage)};

      this.idParam = this.infoAboutUserFromAPI.id
  }



}

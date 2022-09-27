import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import { HttpRequestsService } from '../http-requests.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @ViewChild('authForm') signUpForm: NgForm;
  client = {
    token: ''
  }

  token: string;
clientExist: boolean = true;

  constructor(private httpRequestsService: HttpRequestsService, private router: Router, private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.httpRequestsService.getInfoAboutUserFromApi(this.token);
    this.router.navigate(['form-check/' + this.token], {relativeTo: this.route});
  }

}


// this.router.navigate(['form-details/' + responseData.body.id
//     ], {relativeTo: this.route});
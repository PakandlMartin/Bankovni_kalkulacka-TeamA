import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import { HttpRequestsService } from '../http-requests.service';

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

  constructor(private httpRequestsService: HttpRequestsService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.httpRequestsService.getInfoAboutUser(this.token)
    this.client.token = this.signUpForm.value.token;
    this.clientExist = false
    console.log(this.token)
   
  }

}

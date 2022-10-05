import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {HttpRequestsService} from "../../http-requests.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-auth-employee',
  templateUrl: './auth-employee.component.html',
  styleUrls: ['./auth-employee.component.css']
})
export class AuthEmployeeComponent implements OnInit {
  @ViewChild('authForm') signUpForm: NgForm;

  employee = {
    login: '',
    password: '',
  }

  constructor(private httpService: HttpRequestsService, private router: Router,
              private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn();
  }

  onSubmit(form: NgForm) {
    this.employee.login = this.signUpForm.value.login;
    this.employee.password = this.signUpForm.value.password;
    this.authService.login(this.employee.login, this.employee.password).subscribe(resData => {
      localStorage.setItem('employeeData', JSON.stringify(resData));
      this.router.navigate(['detail'], {relativeTo: this.route});
    })
  };

}
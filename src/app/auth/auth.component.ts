import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpRequestsService } from '../http-requests.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  @ViewChild('authForm') signUpForm: NgForm;
  client = {
    token: '',
  };

  token: string;
  errorMessage = ''

  constructor(
    private httpRequestsService: HttpRequestsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.httpRequestsService
      .getInfoAboutUserFromApi(this.token)
      .subscribe((responseData) => {
        if (responseData.status === 200) {
          localStorage.setItem(
            'userInfoAPI',
            JSON.stringify(responseData.body)
          );
           this.router.navigate(['form-check/' + this.token], {relativeTo: this.route});
        }
      } , (error) => {
         console.error(error);
         this.errorMessage = 'Bohužel nebylo možné nalézt žádost pod tímto ID'
        });
  }
}

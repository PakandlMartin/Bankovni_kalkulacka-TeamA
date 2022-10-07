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

// ID client
  token: string;

  // variable for display error message in template
  errorMessage = ''

  constructor(
    private httpRequestsService: HttpRequestsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  // event handler - submit button
  onSubmit(form: NgForm) {
    // send ID of user to API 
    this.httpRequestsService
      .getInfoAboutUserFromApi(this.token)
      // get data from API
      .subscribe((responseData) => {
        // store data from API about user to localStorage
          localStorage.setItem(
            'userInfoAPI',
            JSON.stringify(responseData.body)
          );
          // navigate user to form with his ID
           this.router.navigate(['form-check/' + this.token], {relativeTo: this.route});
       // if ID is not in database
      } , (error) => {
         console.error(error);
         // display error message in template
         this.errorMessage = 'Bohužel nebylo možné nalézt žádost pod tímto ID'
        });
  }
}

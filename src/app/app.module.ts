import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { FormContactComponent } from './form-contact/form-contact.component';
import { FormCalculationComponent } from './form-calculation/form-calculation.component';
import { HttpRequestsService } from './http-requests.service';
import {RouterModule, Routes} from "@angular/router";

 import { AuthComponent } from './auth/auth.component';
 import { AuthEmployeeComponent } from './auth/auth-employee/auth-employee.component';
import {EmployeeComponent} from "./employee/employee.component";
import {EmployeeDetailComponent} from "./employee/employee-detail/employee-detail.component";
import { FormCheckComponent } from './form-check/form-check.component';
import { WhitespaceValidatorDirective } from './whitespace-validator.directive';
import { IdValidatorDirective } from './id-validator.directive';

const appRoutes: Routes = [
  { path: '', component: FormCalculationComponent },
  { path: 'calculator', component: FormCalculationComponent },
  { path: 'form', component: FormContactComponent },
  { path: 'form/form-details', component: FormDetailsComponent },
  { path: 'form/form-details/:id', component: FormDetailsComponent },
  { path: 'client', component: FormContactComponent},
  { path: 'login', component: AuthComponent },
  { path: 'employee', component: AuthEmployeeComponent },
  { path: 'detail', component: EmployeeComponent },
  { path: 'employee/detail', component: EmployeeComponent, children: [
      {path: ':id', component: EmployeeDetailComponent}
    ] }
  ,{ path: 'login/form-check/:id', component: FormCheckComponent }

];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormDetailsComponent,
    FormContactComponent,
    FormCalculationComponent,
    FormContactComponent,
    AuthComponent,
    AuthEmployeeComponent,
    EmployeeComponent,
    EmployeeDetailComponent,
    FormCheckComponent,
    WhitespaceValidatorDirective,
    IdValidatorDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [HttpRequestsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

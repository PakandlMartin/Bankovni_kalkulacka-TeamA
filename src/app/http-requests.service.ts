import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import { Observable, Subject, tap} from "rxjs";

export interface AuthResponseData {
  login: string,
  name: string,
  roles: [string],
  token: string
}

export interface GetResponseData {
  position: string,
  amount: number,
  numOfMonths: number,
  created: '',
  status: string,
  id: string,
  name: string,
  surname: string,
  companyName: string,
  applicantType: string
}


@Injectable({providedIn: 'root'})
export class HttpRequestsService {

  error = new Subject;
  calculationInfo: object = {};
  infoAboutUser = {
    applicantType: undefined,
    name: undefined,
    surname: undefined,
    birthNum: undefined,
    nationality: undefined,
    email: undefined,
    phone: undefined,
    IC: undefined,
    position: undefined,
    companyName: undefined,
    amount: undefined,
    numOfMonths: undefined,
    monthlyPayment: undefined,
    address: {
      street: undefined,
      descNumber: undefined,
      indicativeNumber: undefined,
      city: undefined,
      postalCode: undefined
    }
  };

  infoAboutUserFromApi = {
    applicantType: undefined,
    name: undefined,
    surname: undefined,
    birthNum: undefined,
    nationality: undefined,
    email: undefined,
    phone: undefined,
    IC: undefined,
    position: undefined,
    companyName: undefined,
    amount: undefined,
    numOfMonths: undefined,
    monthlyPayment: undefined,
    address: {
      street: undefined,
      descNumber: undefined,
      indicativeNumber: undefined,
      city: undefined,
      postalCode: undefined
    }
  }


  token = "qdsMkMpb16";
  myToken: string;

  constructor(private http:HttpClient) {}

  postCalculationInfo(calculationInputsInfo:any) {
    const httpPostBody = calculationInputsInfo;
    this.http
    .post<{name: string}>(
      'http://localhost:8000/request/calculate ',
      httpPostBody, {
        observe: 'response'
      }
      )
      .subscribe(responseData => {
        this.calculationInfo = responseData.body
        // return responseData.body
      }, error => {
        this.error.next(error.message);
      });
    }



postInfoAboutUser(infoAboutUserInput): Observable<any> {
  const httpPostBody = infoAboutUserInput;
return this.http.post<any>(
  'http://localhost:8000/request/create', httpPostBody, {
    observe: "response"
  }
)
}

getInfoAboutUser(id: string) {
  this.http.get<any>('http://localhost:8000/request/' + id).subscribe(responseData =>{
    this.infoAboutUser = responseData
    localStorage.setItem("userInfo", JSON.stringify(responseData))
  }, error => {
    this.error.next(error.message);
  })
}


getInfoAboutUserFromApi(id: string) {
  this.http.get<any>('http://localhost:8000/request/' + id).subscribe(responseData =>{
    this.infoAboutUserFromApi = responseData
    localStorage.setItem("userInfoAPI", JSON.stringify(responseData))
    console.log(responseData)
  }, error => {
    this.error.next(error.message);
  })
}





// showClients(): Observable<[{position: string, amount: number, numOfMonths: number, created: string,
//   status: string, id: string, name: string, surname: string, companyName: string, applicantType: string}]> {
//      return this.http.get<any>('http://localhost:8000/request/list',
//       {headers: new HttpHeaders({
//           Authorization: 'Bearer ' + this.myToken
//         })})
//   }




//   postInfoAboutUser(infoAboutUserInput: any) {
//     const httpPostBody = infoAboutUserInput;
//     this.http
//     .post(
//       'http://localhost:8000/request/create',
//       httpPostBody, {
//         observe: 'response'
//       }
//     )
//     .subscribe(responseData => {
// console.log(responseData.body)
//     }), error => {
//       this.error.next(error.message)
//     }
//   }


  login(login: string, password: string) {
    let codedData = btoa (login + ':' + password);
    return this.http.get<AuthResponseData>('http://localhost:8000/login',
      {headers: new HttpHeaders({
            Authorization: 'Basic ' + codedData
          })}).pipe(tap(responseData => {
            this.myToken = responseData.token
    }));
    }


  showClients(): Observable<[{position: string, amount: number, numOfMonths: number, created: string,
  status: string, id: string, name: string, surname: string, companyName: string, applicantType: string}]> {
     return this.http.get<any>('http://localhost:8000/request/list',
      {headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.myToken
        })})
  }

}





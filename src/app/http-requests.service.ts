import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, tap } from 'rxjs';

export interface AuthResponseData {
  login: string;
  name: string;
  roles: [string];
  token: string;
}

export interface GetResponseData {
  position: string;
  amount: number;
  numOfMonths: number;
  created: '';
  status: string;
  id: string;
  name: string;
  surname: string;
  companyName: string;
  applicantType: string;
}

@Injectable({ providedIn: 'root' })
export class HttpRequestsService {
  error = new Subject();
  calculationInfo: object = {};
  infoAboutUser = {
    applicantType: '',
    name: '',
    surname: '',
    birthNum: '',
    nationality: '',
    email: '',
    phone: '',
    IC: '',
    position: '',
    companyName: '',
    amount: 0,
    numOfMonths: 0,
    address: {
      street: '',
      descNumber: 0,
      indicativeNumber: 0,
      city: '',
      postalCode: 0,
    },
  };

  infoAboutUserFromApi = {
    applicantType: '',
    name: '',
    surname: '',
    birthNum: '',
    nationality: '',
    email: '',
    phone: '',
    IC: '',
    position: '',
    companyName: '',
    amount: 0,
    numOfMonths: 0,
    address: {
      street: '',
      descNumber: 0,
      indicativeNumber: 0,
      city: '',
      postalCode: 0,
    },
  };

  token = 'qdsMkMpb16';
  myToken: string;

  constructor(private http: HttpClient) {}

  postCalculationInfo(calculationInputsInfo: any): Observable<any> {
    const httpPostBody = calculationInputsInfo;
    return this.http
      .post<{ name: string }>(
        'http://localhost:8000/request/calculate ',
        httpPostBody,
        {
          observe: 'response',
        }
      )
      .pipe(
        tap((responseData) => {
          console.log(responseData.body)
          return responseData.body;
        })
      );
  }

  postInfoAboutUser(infoAboutUserInput): Observable<any> {
    const httpPostBody = infoAboutUserInput;
    return this.http.post<any>(
      'http://localhost:8000/request/create',
      httpPostBody,
      {
        observe: 'response',
      }
    );
  }

  getInfoAboutUser(id: string) {
    this.http.get<any>('http://localhost:8000/request/' + id).subscribe(
      (responseData) => {
        this.infoAboutUser = responseData;
        localStorage.setItem('userInfo', JSON.stringify(responseData));
        return true
      },
      (error) => {
        this.error.next(error.message);
        return false
      }
    );
  }

  getInfoAboutUserFromApi(id: string):Observable<any> {
    return this.http.get<any>('http://localhost:8000/request/' + id, { observe: 'response'})
  }

  login(login: string, password: string) {
    let codedData = btoa(login + ':' + password);
    return this.http
      .get<AuthResponseData>('http://localhost:8000/login', {
        headers: new HttpHeaders({
          Authorization: 'Basic ' + codedData,
        }),
      })
      .pipe(
        tap((responseData) => {
          this.myToken = responseData.token;
        })
      );
  }

  showClients(): Observable<
    [
      {
        position: string;
        amount: number;
        numOfMonths: number;
        created: string;
        status: string;
        id: string;
        name: string;
        surname: string;
        companyName: string;
        applicantType: string;
      }
    ]
  > {
    return this.http.get<any>('http://localhost:8000/request/list', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.myToken,
      }),
    });
  }
}


// postCalculationInfo(calculationInputsInfo: any) {
//   const httpPostBody = calculationInputsInfo;
//   this.http
//     .post<{ name: string }>(
//       'http://localhost:8000/request/calculate ',
//       httpPostBody,
//       {
//         observe: 'response',
//       }
//     )
//     .subscribe(
//       (responseData) => {
//         this.calculationInfo = responseData.body;
//         localStorage.setItem(
//           'userInfoCalculation',
//           JSON.stringify(responseData.body)
//         );
//       },
//       (error) => {
//         this.error.next(error.message);
//       }
//     );
// }



// getInfoAboutUser(id: string) {
//   this.http.get<any>('http://localhost:8000/request/' + id).subscribe(
//     (responseData) => {
//       this.infoAboutUser = responseData;
//       localStorage.setItem('userInfo', JSON.stringify(responseData));
//       return true
//     },
//     (error) => {
//       this.error.next(error.message);
//       return false
//     }
//   );
// }
import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthResponseData} from "../http-requests.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loggedIn = new BehaviorSubject(false);
  public loggedIn = this._loggedIn.asObservable();
  id: number;
  myToken: string;


  clientDetails: {
    applicantType: string, name: string, surname: string, birthNum: string, nationality: string, email: string,
    phone: string, IC: string, position: string, companyName: string, amount: number, numOfMonths: number,
    address: { street: string, descNumber: number, indicativeNumber: number, city: string, postalCode: number },
    created: string, status: string, id: string
  }


  data: [
    {
      position: string, amount: number, numOfMonths: number, created: string,
      status: string, id: string, name: string, surname: string,
      companyName: string, applicantType: string
    }
  ];

  client: {
    position: string, amount: number, numOfMonths: number, created: string,
    status: string, id: string, name: string, surname: string,
    companyName: string, applicantType: string
  };

  constructor(private http: HttpClient) {
  }

  isLoggedIn() {
    const userData = JSON.parse(localStorage.getItem('employeeData'));
    this._loggedIn.next(userData !== undefined);
    return userData !== undefined;

  }

  login(login: string, password: string) {
    let codedData = btoa(login + ':' + password);
    return this.http.get<AuthResponseData>('http://localhost:8000/login',
      {
        headers: new HttpHeaders({
          Authorization: 'Basic ' + codedData
        }),
      }).pipe(tap(responseData => {
      this.myToken = responseData.token
    }));
  }


  showClients(): Observable<[{
    position: string, amount: number, numOfMonths: number, created: string,
    status: string, id: string, name: string, surname: string, companyName: string, applicantType: string
  }]> {
    return this.http.get<any>('http://localhost:8000/request/list',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' 
          + this.myToken
        })
      })
  }

  showClientDetails(id: string): Observable<{
    applicantType: string, name: string, surname: string, birthNum: string, nationality: string, email: string,
    phone: string, IC: string, position: string, companyName: string, amount: number, numOfMonths: number,
    address: { street: string, descNumber: number, indicativeNumber: number, city: string, postalCode: number },
    created: string, status: string, id: string
  }> {
    return this.http.get<any>('http://localhost:8000/request/' + id);
  }

  approveRequest(id: string): Observable<any> {
    console.log(id)
    return this.http.put<any>('http://localhost:8000/request/'+ id +'/approve','', 
  {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + 'mazwdbGkD5'
    })
    });
  }



  cancelRequest(id: string): Observable<{
    applicantType: string, name: string, surname: string, birthNum: string, nationality: string, email: string,
    phone: string, IC: string, position: string, companyName: string, amount: number, numOfMonths: number,
    address: { street: string, descNumber: number, indicativeNumber: number, city: string, postalCode: number },
    created: string, status: string, id: string
  }> {
    return this.http.put<any>('http://localhost:8000/request/'+id+'/cancel','', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.myToken
      })
    });
  }


  displayRequests() {
    this.showClients().subscribe(responseData => {
      this.data = responseData;
    });
  }

  displayDetails(id): Observable<any> {
    return this.showClientDetails(id).pipe(tap(responseData => {
      this.clientDetails = responseData;
    }));
  }


}


// approveRequest(id: string): Observable<{
//   applicantType: string, name: string, surname: string, birthNum: string, nationality: string, email: string,
//   phone: string, IC: string, position: string, companyName: string, amount: number, numOfMonths: number,
//   address: { street: string, descNumber: number, indicativeNumber: number, city: string, postalCode: number },
//   created: string, status: string, id: string
// }> {
//   console.log(id)
//   return this.http.put<any>('http://localhost:8000/request/'+ id +'/approve', {
//     headers: new HttpHeaders({
//       Authorization: `Bearer qdsMkMpb16`
//     })
//   });
// }
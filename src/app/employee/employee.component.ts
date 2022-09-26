import {Component, OnInit} from '@angular/core';
import {HttpRequestsService} from "../http-requests.service";
import {AuthService} from "../auth/auth.service";



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  id: number;

  data: [
    {
      position: string, amount: number, numOfMonths: number, created: string,
      status: string, id: string, name: string, surname: string,
      companyName: string, applicantType: string
    }
  ];

  clients: [{
    position: string, amount: number, numOfMonths: number, created: string,
    status: string, id: string, name: string, surname: string,
    companyName: string, applicantType: string
  }

  ]

  client: {
    position: string, amount: number, numOfMonths: number, created: string,
    status: string, id: string, name: string, surname: string,
    companyName: string, applicantType: string
  };


  constructor(private httpRequestService: HttpRequestsService, private authService: AuthService) {

  }


  ngOnInit(): void {
    this.authService.isLoggedIn();
  }

  formatStatus(status) {
    if (status === 'PENDING') {
      return 'Nerozhodnutá'
    } else if (status === 'APPROVED') {
      return 'Schválená'
    } else return 'Zamítnutá'
  }

  numberWithSpaces(number) {
    return (
      (number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")).toString()
    );
  }

  displayRequests() {
    this.authService.showClients().subscribe(responseData => {
      this.data = responseData;
    });
  }


  compareSurnames(a, b) {
    const name1 = a.surname.toUpperCase();
    const name2 = b.surname.toUpperCase();

    let comparison = 0;

    if (name1 > name2) {
      comparison = 1;
    } else if (name1 < name2) {
      comparison = -1;
    }
    return comparison;
  }

  compareAmount(a, b) {
    return a.amount - b.amount;
  }


  sortBySurname() {
    this.authService.displayRequests();
    this.clients = this.data.sort(this.compareSurnames);
    this.client = this.clients[this.id];
  }


  sortByAmount() {
    this.authService.displayRequests();
    this.clients = this.data.sort(this.compareAmount);
    this.client = this.clients[this.id];
  }
}
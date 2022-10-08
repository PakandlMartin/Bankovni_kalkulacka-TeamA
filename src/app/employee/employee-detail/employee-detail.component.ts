import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserInfoService} from "../../user-info.service";
import {HttpRequestsService} from "../../http-requests.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  id: number;


  client: {
    applicantType: string,
    name: string,
    surname: string,
    birthNum: string,
    nationality: string,
    email: string,
    phone: string,
    IC: string,
    position: string,
    companyName: string,
    amount: number,
    numOfMonths: number,
    address: {
      street: string,
      descNumber: number,
      indicativeNumber: number,
      city: string,
      postalCode: number
    },
    created: string,
    status: string,
    id: string
  };

  data: [
    {
      position: string, amount: number, numOfMonths: number, created: string,
      status: string, id: string, name: string, surname: string,
      companyName: string, applicantType: string
    }
  ];



  constructor(private route: ActivatedRoute, private userInfoService: UserInfoService,
              private httpRequestService: HttpRequestsService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.authService.id = this.id;
          console.log(this.id);
          this.authService.displayDetails(this.id).subscribe(resultData => {
            this.client = resultData;
          })

        });
  }


  onApproveRequest(clientId) {
    console.log(clientId)
    this.authService.approveRequest(clientId)
    .subscribe(resultData => {
      console.log(resultData)
    });

  }

  onCancelRequest(clientId) {
    this.authService.cancelRequest(clientId).subscribe(resultData => {
      console.log(resultData)
    });
  }

  formatStatus(status) {
    if (status === 'PENDING') {
      return 'Neschválená'
    } else {
      return 'Schválená'
    }
  }

  formatTypeOfClient(type) {
    if (type === 'INDIVIDUAL') {
      return 'Fyzická osoba'
    } else if (type === 'LEGAL_ENTITY') {
      return 'Právnická osoba'
    } else {
      return 'OSVČ'
    }
  }

  numberWithSpaces(number) {
    return (
      (number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")).toString()
    );
  }

}
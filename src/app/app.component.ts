import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  clients: {
    name: string;
    id: number;
    nationality: string;
    email: string;
    phone: string;
    street: string;
    streetNo: string;
    city: string;
    psc: string;
  }[] = [];

  constructor() {}

  ngOnInit() {}
}

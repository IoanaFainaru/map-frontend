import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginCredentials: any;

  constructor() {
    this.loginCredentials = {};
    // TODO finish login
  }

  ngOnInit() {
  }

}

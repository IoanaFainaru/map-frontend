import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

    loginForm: FormGroup;
    loginCredentials: any;

    constructor() {
        this.loginCredentials = {};
    }

    ngOnInit() {}

    login() {}

}

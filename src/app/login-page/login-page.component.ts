import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

    loginForm: FormGroup;
    errorMsg: string;

    constructor(
        private userService: UserService,
        private router: Router,
        private localStorage: LocalStorage
    ) {
        this.loginForm = new FormGroup({
            'username': new FormControl(this.loginForm, [Validators.required]),
            'password': new FormControl(this.loginForm, [Validators.required]),
        });
    }

    ngOnInit() {}

    login(credentials) {
        this.userService.getUserData(credentials).toPromise()
            .then(user => {
                if (credentials.password === user.password) {
                    // save user credentials and redirect to main page
                    this.localStorage.setItem('userData', user)
                        .subscribe(() => {
                            this.router.navigateByUrl('/map');
                        });
                } else {
                    this.errorMsg = 'Wrong Password';
                }
            })
            .catch(err => {
                this.errorMsg = err.error.error;
            });
    }

}

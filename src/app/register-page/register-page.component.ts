import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

    registerForm: FormGroup;
    errorMsg: string;

    constructor(
        private userService: UserService,
        private router: Router
    ) {
        this.registerForm = new FormGroup({
            'name': new FormControl(this.registerForm, [Validators.required]),
            'username': new FormControl(this.registerForm, [Validators.required]),
            'email': new FormControl(this.registerForm, [Validators.required]),
            'password': new FormControl(this.registerForm, [Validators.required]),
            'type': new FormControl(this.registerForm, [Validators.required])
        });
    }

    ngOnInit() {}


    /**
     * @desc call userService's 'register' method to create an account
     *
     * @param {*} data
     * @returns
     * @memberof RegisterPageComponent
     */
    createAccount(data) {
        if (data) {
            return this.userService.register(data).toPromise()
                .then(response => {
                    console.log('createAccount', response);
                })
                .then(() => {
                    this.errorMsg = undefined;
                    // TODO - navigate to map page
                    this.router.navigateByUrl('/map');
                })
                .catch(err => {
                    console.warn('createAccount', err);
                    this.errorMsg = err.error.error;
                });
        } else {
            console.warn('Please complete all input fields');
        }
    }

}

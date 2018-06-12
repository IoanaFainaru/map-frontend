import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { API } from '../../constants/endpoints';

@Injectable()
export class UserService {

    headers: any;

    constructor(
        private http: HttpClient,
    ) {
        this.headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Access-Control-Allow-Origin', '*');
    }


    /**
     * @desc add a user or company to the DB
     * @param {any} user can be user or company type
     * @returns {Observable<any>}
     * @memberof UserService
     */
    public register(user): Observable<any> {

        return Observable.create(observer => {
            this.http.post(API.user, user, { headers: this.headers })
                .subscribe(response => {
                    observer.next(response);
                    observer.complete();
                }, err => {
                    observer.error(err);
                });
        });

    }



    public getUserData(user): Observable<any> {

        return Observable.create(observer => {
            this.http.get(`${API.user}/${user.username}`)
                .subscribe(response => {
                    observer.next(response);
                    observer.complete();
                }, err => {
                    observer.error(err);
                });
        });
    }

}

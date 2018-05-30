import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { API } from '../../constants/endpoints';

@Injectable()
export class CountriesService {

    constructor(
        private http: HttpClient
    ) { }


    getCountryInfo(countryCode): Observable<any> {

        return Observable.create(observer => {
            this.http.get(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
                .subscribe(response => {
                    observer.next(response);
                    observer.complete();
                }, error => {
                    observer.error(error);
                });
        });

    }


    getTop10Cities(): Observable<any> {

        return Observable.create(observer => {
            this.http.get(API.getTop10Cities)
                .subscribe(response => {
                    observer.next(response);
                    observer.complete();
                });
        }, err => {
            console.warn('Error testing api call', err);
        });

    }

}

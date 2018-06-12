import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { API } from '../../constants/endpoints';

@Injectable()
export class CountriesService {

    constructor(
        private http: HttpClient
    ) { }


    /**
     * @desc get some info about the selected country
     * @param {*} countryCode ISO 2-letter code
     * @returns {Observable<any>}
     * @memberof CountriesService
     */
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


    /**
     * @desc function that gets the first 10 most visited cities
     * @returns {Observable<any>}
     * @memberof CountriesService
     */
    getTop10Cities(): Observable<any> {

        return Observable.create(observer => {
            this.http.get(API.getTop10Cities)
                .subscribe(response => {
                    observer.next(response);
                    observer.complete();
                }, err => {
                    observer.error(err);
                });
        });

    }


    /**
     * @desc funtion that retrieves an array with all the countries visited by user
     * @param {*} userId
     * @returns {Observable<any>}
     * @memberof CountriesService
     */
    getUserCountries(userId): Observable<any> {

        return Observable.create(observer => {
            this.http.get(`${API.getUserCities}/${userId}`)
                .subscribe(response => {
                    observer.next(response);
                    observer.complete();
                }, err => {
                    observer.error(err);
                });
        });

    }


    getAllCountriesFromDB(): Observable<any> {

        return Observable.create(observer => {
            this.http.get(API.getAllCities)
                .subscribe(response => {
                    observer.next(response);
                    observer.complete();
                }, err => {
                    observer.error(err);
                });
        });

    }


}

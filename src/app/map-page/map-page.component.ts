import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { CountriesService } from '../services/countries/countries.service';

// declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MapPageComponent implements OnInit {

    private worldMap: AmChart;
    selectedCountry: any;
    noOfVisitedCountries: number;
    currentUser: any;

    constructor(
        private router: Router,
        private ref: ChangeDetectorRef,
        private AmCharts: AmChartsService,
        private countriesService: CountriesService,
        private localStorage: LocalStorage
    ) {

        /**
         * when the page starts loading:
         *      1. get user info
         *      2. get countries visited by user
         *      3. load the number of visited countries
         *      4. load the World Map
         */
        this.localStorage.getItem('userData').toPromise()
            .then(user => {
                this.currentUser = user;
            })
            .then(() => {
                return this.countriesService.getUserCountries(this.currentUser.id).toPromise();
            })
            .then(countriesList => {
                const countryNames = countriesList.map(country => country.description);

                this.noOfVisitedCountries = countryNames.length;
                this.ref.detectChanges();

                return countryNames;
            })
            .then(countries => {
                this.loadWorldMap(countries);
            });
    }

    ngOnInit() {}

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy() {
        this.AmCharts.destroyChart(this.worldMap);
    }



    loadWorldMap(countries) {
        this.worldMap = this.AmCharts.makeChart('chartdiv', {
            'type': 'map',
            'theme': 'dark',
            'projection': 'mercator',
            'showAreasInList': true,
            'panEventsEnabled': true,
            'autoDisplay': true,
            'zoomDuration': 0.2,
            'dataProvider': {
                'map': 'worldLow',
                'getAreasFromMap': true
            },
            'areasSettings': {
                'autoZoom': true,
                'color': '#ccc',
                // 'selectedColor': '#FC5185',
                'selectedColor': this.getRandomColor(),
                'rollOverOutlineColor': '#FC5185',
                'selectable': (this.currentUser.type === 'TOURIST') ? true : false
            },
            'listeners': [
                {
                    'event': 'init',
                    'method': () => {
                        // load map with user's visited countries
                        this.preSelectCountries(countries);
                    }
                },
                {
                    'event': 'clickMapObject',
                    'method': (event) => {
                        this.handleActionsonMap(event);
                    }
                }
            ]
        });
        // end map config
    }


    preSelectCountries(list) {
        for (let i = 0; i < list.length; i++) {
            const area = this.worldMap.getObjectById(list[i]);
            area.showAsSelected = true;
            this.worldMap.returnInitialColor(area);
        }
    }



    handleActionsonMap(event) {

        const country = this.worldMap.getObjectById(event.chart.selectedObject.id);
        console.log(`${country.id} - ${country.title}`);

        // get info of selected country
        this.countriesService.getCountryInfo(country.id).toPromise()
            .then(data => {
                // console.log(data);
                this.selectedCountry = data;
                this.ref.detectChanges();
            })
            .catch(err => {
                console.warn(err);
            })
            .then(() => {
                // deselect the area by assigning all of the dataProvider as selected object
                this.worldMap.selectedObject = this.worldMap.dataProvider;

                // toggle showAsSelected
                event.mapObject.showAsSelected = !event.mapObject.showAsSelected;

                // bring it to an appropriate color
                this.worldMap.returnInitialColor(event.mapObject);

                // let's build a list of currently selected countries
                const selectedCountries = [];
                // tslint:disable-next-line:forin
                for (const i in this.worldMap.dataProvider.areas) {
                    const area = this.worldMap.dataProvider.areas[i];
                    if (area.showAsSelected) {
                        // set a new color only if it wasn't assigned before
                        area.selectedColor = area.selectedColor || this.getRandomColor();
                        selectedCountries.push(area.title);
                    }
                }

                this.worldMap.validateNow();

            })
            .then(() => {
                this.countriesService.markCountryAsVisited(this.currentUser.id, this.selectedCountry.numericCode)
                    .toPromise()
                    .then(() => {
                        // country added
                        return this.countriesService.getUserCountries(this.currentUser.id).toPromise();
                    })
                    .then(countriesList => {
                        // tslint:disable-next-line:no-shadowed-variable
                        const countryNames = countriesList.map(country => country.description);

                        this.noOfVisitedCountries = countryNames.length;
                        this.ref.detectChanges();

                        return countryNames;
                    })
                    .catch(() => {
                        // country already exists, remove it
                        this.countriesService.deleteVisitedCountry(this.currentUser.id, this.selectedCountry.numericCode)
                            .toPromise()
                            .then(() => { this.ref.detectChanges(); })
                            .catch(() => { this.ref.detectChanges(); })
                            .then(() => {
                                return this.countriesService.getUserCountries(this.currentUser.id).toPromise();
                            })
                            .then(countriesList => {
                                // tslint:disable-next-line:no-shadowed-variable
                                const countryNames = countriesList.map(country => country.description);

                                this.noOfVisitedCountries = countryNames.length;
                                this.ref.detectChanges();

                                return countryNames;
                            });
                    });
            });
    }


    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


}

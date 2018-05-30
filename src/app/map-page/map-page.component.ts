import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';

import { CountriesService } from '../services/countries/countries.service';

declare var jquery: any;
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

    constructor(
        private router: Router,
        private ref: ChangeDetectorRef,
        private AmCharts: AmChartsService,
        private countriesService: CountriesService
    ) { }

    ngOnInit() {
        this.selectedCountry = {};
        this.loadWorldMap();
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy() {
        this.AmCharts.destroyChart(this.worldMap);
    }


    // show/hide top info box
    toggle() {
        $('.ui.sidebar.segment').sidebar('toggle');
    }


    loadWorldMap() {
        this.worldMap = this.AmCharts.makeChart('chartdiv', {
            'type': 'map',
            'theme': 'light',
            'projection': 'mercator',
            'showAreasInList': true,
            'autoDisplay': true,
            'zoomDuration': 0.2,
            'dataProvider': {
                'map': 'worldLow',
                'getAreasFromMap': true
            },
            'areasSettings': {
                'color': '#ccc',
                'selectedColor': '#70C1B3',
                'selectable': true
            },
            'listeners': [
                {
                    'event': 'init',
                    'method': () => {
                        // TODO
                        // Get countries from user profile
                        this.preSelectCountries(['RO', 'HU', 'IT', 'GB', 'ES']);
                    }
                },
                {
                    'event': 'clickMapObject',
                    'method': (event) => {

                        const country = this.worldMap.getObjectById(event.chart.selectedObject.id);
                        console.log(`${country.id} - ${country.title}`);

                        this.clickOnContry(country.id)
                            .then(data => {
                                // console.log(data);
                                this.selectedCountry = data;
                                this.ref.detectChanges();
                            })
                            .then(() => {
                                this.toggle();
                            })
                            .catch(err => {
                                console.warn(err);
                            });

                        // deselect the area by assigning all of the dataProvider as selected object
                        this.worldMap.selectedObject = this.worldMap.dataProvider;
                        // toggle showAsSelected
                        event.mapObject.showAsSelected = !event.mapObject.showAsSelected;
                        // bring it to an appropriate color
                        this.worldMap.returnInitialColor(event.mapObject);
                        // let's build a list of currently selected countries
                        const selectedCountries = [];
                        for (let i = 0; i < this.worldMap.dataProvider.areas; i++) {
                            const area = this.worldMap.dataProvider.areas[i];
                            if (area.showAsSelected) {
                                selectedCountries.push( area.title );
                                console.log(selectedCountries);
                            }
                        }
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



    private clickOnContry(countryCode) {
        return this.countriesService.getCountryInfo(countryCode).toPromise();
    }


}

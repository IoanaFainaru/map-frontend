import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent {

    private worldMap: AmChart;

    constructor(
        private router: Router,
        private AmCharts: AmChartsService
    ) {

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
                            }
                        }
                    }
                }
            ]
        });
        // end map config
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy() {
        this.AmCharts.destroyChart(this.worldMap);
    }



    preSelectCountries(list) {
        for (let i = 0; i < list.length; i++) {
            const area = this.worldMap.getObjectById(list[i]);
            area.showAsSelected = true;
            this.worldMap.returnInitialColor(area);
        }
    }


}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AmChartsModule } from '@amcharts/amcharts3-angular';

// Pages
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MapPageComponent } from './map-page/map-page.component';

// Services
import { CountriesService } from './services/countries/countries.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        MapPageComponent,
        RegisterPageComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        AmChartsModule,
    ],
    providers: [CountriesService],
    bootstrap: [AppComponent]
})
export class AppModule { }

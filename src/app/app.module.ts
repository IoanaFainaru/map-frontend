import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';

// Pages
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MapPageComponent } from './map-page/map-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MapPageComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AmChartsModule,
    NgSemanticModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

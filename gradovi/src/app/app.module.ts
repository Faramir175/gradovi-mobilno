import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Correctly import HttpClientModule
import { IonicModule } from '@ionic/angular';  // Import IonicModule once
import { AppComponent } from './app.component';
import { CityService } from './services/city.service'; // Import CityService
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Allows custom elements like Ionic components
  declarations: [
    AppComponent,
    // other components
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),  // Initialize Ionic
    AppRoutingModule,
    HttpClientModule  // Add HttpClientModule to imports
    // other modules
  ],
  providers: [
    CityService,
    // other providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// src/app/cities/cities.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesComponent } from './cities.component';
import { RouterModule } from '@angular/router'; // Ako koristiš rute
import { IonicModule } from '@ionic/angular';
import { CitiesRoutingModule } from './cities-routing.module';

@NgModule({
  declarations: [
    CitiesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CitiesRoutingModule,
    IonicModule // Dodaj RouterModule ako koristiš rute
  ],
  exports: [
    CitiesComponent
  ]
})
export class CitiesModule {}

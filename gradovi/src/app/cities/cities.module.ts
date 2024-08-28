// src/app/cities/cities.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesComponent } from './cities.component';
import { RouterModule } from '@angular/router';
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
    IonicModule
  ],
  exports: [
    CitiesComponent
  ]
})
export class CitiesModule {}

// src/app/city-details/city-details.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityDetailsComponent } from './city-details.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CityDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CityDetailsComponent
  ]
})
export class CityDetailsModule {}

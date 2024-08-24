import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityDetailComponent } from './city-detail.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Ako koristite form-e

@NgModule({
  declarations: [
    CityDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: '', component: CityDetailComponent}
    ]) // Dodajte RouterModule ako je potrebno
     // Dodajte FormsModule ako koristite form-e
  ]
})
export class CityDetailModule { }

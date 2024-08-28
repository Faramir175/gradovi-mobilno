import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityDetailComponent } from './city-detail.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {IonicModule} from "@ionic/angular";

@NgModule({
  declarations: [
    CityDetailComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path: '', component: CityDetailComponent}
        ]),
        IonicModule,
    ]
})
export class CityDetailModule { }

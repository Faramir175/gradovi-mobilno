// src/app/profile/profile.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { ProfileRoutingModule } from './profile-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    ProfileRoutingModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule {}

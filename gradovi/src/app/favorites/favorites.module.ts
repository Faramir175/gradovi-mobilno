// src/app/favorites/favorites.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FavoriteRoutingModule } from './favorites-routing.module';

@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    FavoriteRoutingModule
  ],
  exports: [
    FavoritesComponent
  ]
})
export class FavoritesModule {}

import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { City } from '../models/city-model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteCities: City[] = [];

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.cityService.getFavoriteCities().subscribe(cities => {
      this.favoriteCities = cities;
    });
  }

  removeFromFavorites(cityId: string): void {
    this.cityService.removeCityFromFavorites(cityId).subscribe(() => {
      this.loadFavorites(); // Refresh list after removal
    });
  }
}

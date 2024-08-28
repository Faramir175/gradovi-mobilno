import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { City } from '../models/city-model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  cities: City[] = [];
  favorites: string[] = [];

  constructor(private cityService: CityService, private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadCities();
    this.loadFavoriteCities();
  }

  loadCities() {
    this.cityService.getCities().subscribe((data: City[]) => {
      this.cities = data;
      this.checkFavorites();
    }, error => {
      console.error("Greška prilikom učitavanja gradova:", error);
    });
  }

  loadFavoriteCities() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.cityService.getFavoriteCities(userId).subscribe(favorites => {
        this.favorites = favorites.map(fav => fav.cityId);
        this.checkFavorites();
      });
    }
  }

  checkFavorites() {
    this.cities.forEach(city => {
      city.isInFavorites = this.favorites.includes(city.id);
    });
  }

  addToFavorites(city: City, event: MouseEvent): void {
    event.stopPropagation();
    const userId = this.authService.getUserId();
    if (userId) {
      this.cityService.addCityToFavorites(userId, city.id).subscribe(() => {
        city.isInFavorites = true;
        this.favorites.push(city.id);
      });
    } else {
      console.error("User ID is null, cannot add city to favorites.");
    }
  }

  removeFromFavorites(city: City, event: MouseEvent): void {
    event.stopPropagation();
    const userId = this.authService.getUserId();

    if (userId) {
      this.cityService.removeCityFromFavorites(userId, city.id).subscribe(() => {
        city.isInFavorites = false;
        this.favorites = this.favorites.filter(fav => fav !== city.id);
      });
    } else {
      console.error("User ID is null, cannot remove city from favorites.");
    }
  }

  navigateToDetails(cityId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.router.navigate(['/city-detail', cityId]);
  }
}

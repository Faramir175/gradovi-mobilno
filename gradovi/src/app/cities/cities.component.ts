import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { City } from '../models/city-model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  cities: City[] = [];
  favorites: string[] = []; // Lista omiljenih gradova

  constructor(private cityService: CityService, private authService: AuthService) {
    console.log('CitiesComponent inicijalizovan.');
  }

  ngOnInit() {
    this.loadCities();
    this.loadFavoriteCities(); // Učitaj omiljene gradove pri inicijalizaciji
  }

  loadCities() {
    this.cityService.getCities().subscribe((data: City[]) => {
      this.cities = data;
      console.log(this.cities); // Proverite da li ste uspešno učitali gradove
      this.checkFavorites(); // Proverite omiljene gradove nakon učitavanja
    }, error => {
      console.error("Greška prilikom učitavanja gradova:", error);
    });
  }

  loadFavoriteCities() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.cityService.getFavoriteCities(userId).subscribe(favorites => {
        this.favorites = favorites.map(fav => fav.cityId); // Dobijamo ID-ove omiljenih gradova
        this.checkFavorites(); // Ažuriraj status omiljenih gradova
      });
    }
  }

  checkFavorites() {
    this.cities.forEach(city => {
      city.isInFavorites = this.favorites.includes(city.id);
    });
  }

  addToFavorites(city: City, event: MouseEvent): void {
    event.stopPropagation(); // Prekinite propagaciju klika
    const userId = this.authService.getUserId(); // Dobijte ID korisnika
  
    if (userId) {
      this.cityService.addCityToFavorites(userId, city.id).subscribe(() => {
        city.isInFavorites = true; // Postavite isInFavorites na true
        this.favorites.push(city.id); // Ažuriraj listu omiljenih
      });
    } else {
      console.error("User ID is null, cannot add city to favorites.");
    }
  }

  removeFromFavorites(city: City, event: MouseEvent): void {
    event.stopPropagation(); // Prekinite propagaciju klika
    const userId = this.authService.getUserId(); // Dobijte ID korisnika
  
    if (userId) {
      this.cityService.removeCityFromFavorites(userId, city.id).subscribe(() => {
        city.isInFavorites = false; // Postavite isInFavorites na false
        this.favorites = this.favorites.filter(fav => fav !== city.id); // Ažuriraj listu omiljenih
      });
    } else {
      console.error("User ID is null, cannot remove city from favorites.");
    }
  }

  navigateToDetails(cityId: string, event: MouseEvent) {
    event.stopPropagation();
    // Ovde će se otvoriti novi prozor sa detaljima grada
  }
}

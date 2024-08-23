import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CityService } from '../services/city.service';
import { City } from '../models/city-model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteCities: City[] = []; // Lista omiljenih gradova
  favorites: string[] = [];

  constructor(private cityService: CityService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId(); // Dobijte ID korisnika
    if (userId) {
      this.loadFavorites(userId); // Učitajte omiljene gradove za korisnika
    } else {
      console.error("User ID is null, cannot load favorite cities.");
    }
  }

  loadFavorites(userId: string): void {
    console.log("Ucitam");
    this.cityService.getFavoriteCities(userId).subscribe(favoriteData => {
      favoriteData.forEach(favorite => {
        console.log('Pretražujem grad sa ID-jem:', favorite.cityId); // Dodajte ovu liniju
        this.cityService.getCity(favorite.cityId).subscribe(city => {
          if (city) { // Proveri da li je city != null
            console.log("City ID: ", favorite.cityId);
            this.favoriteCities.push({
              id: favorite.cityId,
              name: city.name,
              imageUrl: city.imageUrl,
              description: city.description,
              rating: city.rating,
              isInFavorites: true // Postavi na true jer je grad omiljen
            });
          } else {
            console.error(`Grad sa ID-jem ${favorite.cityId} nije pronađen.`);
          }
        }, error => {
          console.error('Greška prilikom preuzimanja grada:', error);
        });
      });
    }, error => {
      console.error('Greška prilikom preuzimanja omiljenih gradova:', error);
    });
  }
  
  
  
  removeFromFavorites(city: City, event: MouseEvent): void {
    event.stopPropagation(); // Prekinite propagaciju klika
    const userId = this.authService.getUserId(); // Dobijte ID korisnika
  
    if (userId) {
      console.log(userId);
      console.log(city);
      this.cityService.removeCityFromFavorites(userId, city.id).subscribe(() => {
        city.isInFavorites = false; // Postavite isInFavorites na false
        this.favorites = this.favorites.filter(fav => fav !== city.id); // Ažuriraj listu omiljenih
        location.reload();
      });
    } else {
      console.error("User ID is null, cannot remove city from favorites.");
    }
  }
}

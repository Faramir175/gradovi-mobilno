import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CityService } from '../services/city.service';
import { City } from '../models/city-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteCities: City[] = []; // Lista omiljenih gradova
  favorites: string[] = [];

  constructor(private cityService: CityService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.loadFavorites(userId); // Ucitava omiljene gradove za korisnika
    } else {
      console.error("User ID is null, cannot load favorite cities.");
    }
  }

  loadFavorites(userId: string): void {
    console.log("Ucitam");
    this.cityService.getFavoriteCities(userId).subscribe(favoriteData => {
      favoriteData.forEach(favorite => {
        console.log('Pretražujem grad sa ID-jem:', favorite.cityId);
        this.cityService.getCity(favorite.cityId).subscribe(city => {
          if (city) {
            console.log("City ID: ", favorite.cityId);
            this.favoriteCities.push({
              id: favorite.cityId,
              name: city.name,
              imageUrl: city.imageUrl,
              description: city.description,
              rating: city.rating,
              isInFavorites: true
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
    event.stopPropagation();
    const userId = this.authService.getUserId();

    if (userId) {
      console.log(userId);
      console.log(city);
      this.cityService.removeCityFromFavorites(userId, city.id).subscribe(() => {
        city.isInFavorites = false;
        this.favorites = this.favorites.filter(fav => fav !== city.id); // Azurira listu omiljenih
        location.reload();
      });
    } else {
      console.error("User ID is null, cannot remove city from favorites.");
    }
  }

  navigateToDetails(cityId: string, event: MouseEvent): void {
    event.stopPropagation(); // Sprečavanje događaja na roditeljskoj komponenti

    this.router.navigate(['/city-detail', cityId]);
  }
}

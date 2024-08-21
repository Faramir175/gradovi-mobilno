import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { City } from '../models/city-model';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  cities: City[] = [];
  favorites: string[] = []; // Lista omiljenih gradova

  constructor(private cityService: CityService) {
    console.log('CitiesComponent inicijalizovan.');
  }

  ngOnInit() {
    console.log("Uspesno kurac");
    this.getCities();
  }

  getCities() {
    console.log('Poziv za dobijanje gradova');
    this.cityService.getCities().subscribe((cities) => {
        console.log('Gradovi dobijeni:', cities);
        this.cities = cities.map(city => ({
            ...city,
            isInFavorites: false // Inicijalizuj isInFavorites
        }));
        this.checkFavorites();
    }, error => {
        console.error('Greška prilikom dobijanja gradova:', error);
    });
  }

  checkFavorites() {
    this.cities.forEach(city => {
      if (this.favorites.includes(city.id)) {
        city.isInFavorites = true;
      } else {
        city.isInFavorites = false;
      }
    });
  }

  addToFavorites(city: City, event: MouseEvent) {
    event.stopPropagation();
    if (!this.favorites.includes(city.id)) {
      this.favorites.push(city.id);
      city.isInFavorites = true;
    }
  }

  removeFromFavorites(city: City, event: MouseEvent) {
    event.stopPropagation();
    this.favorites = this.favorites.filter(id => id !== city.id);
    city.isInFavorites = false;
  }

  navigateToDetails(cityId: string, event: MouseEvent) {
    event.stopPropagation();
    // Ovde će se otvoriti novi prozor sa detaljima grada
  }
}

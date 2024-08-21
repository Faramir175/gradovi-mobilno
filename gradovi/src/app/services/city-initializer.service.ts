import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { City } from '../models/city-model'; // Uvezi model

@Injectable({
  providedIn: 'root'
})
export class CityInitializerService {
  
  private firebaseUrl = `${environment.firebaseConfig.databaseURL}/cities.json`;

  constructor(private http: HttpClient) {}

  addCitiesToDatabase() {
    const cities: City[] = [
      {
        id: '1',
        name: 'Beograd',
        imageUrl: 'url-do-slike-beograda',
        description: 'Glavni grad Srbije, poznat po svojoj bogatoj istoriji.',
        rating: '4.5',
        isInFavorites: false
      },
      {
        id: '2',
        name: 'Novi Sad',
        imageUrl: 'url-do-slike-novi-sada',
        description: 'Grad poznat po Petrovaradinskoj tvrđavi i festivalu EXIT.',
        rating: '4.7',
        isInFavorites: false
      },
      // Dodaj ostalih 28 gradova sa svim potrebnim informacijama...
    ];

    cities.forEach(city => {
      this.http.post(this.firebaseUrl, city)
        .subscribe(response => {
          console.log('Grad dodat:', response);
        }, error => {
          console.error('Greška pri dodavanju grada:', error);
        });
    });
  }
}

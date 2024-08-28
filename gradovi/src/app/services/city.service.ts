import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city-model';
import { environment } from '../../environments/environment';
import { map, catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseUrl = `${environment.firebaseConfig.databaseURL}/cities/cities`;
  private favoritesUrl = `${environment.firebaseConfig.databaseURL}/favorites`;

  constructor(private http: HttpClient) {
    console.log("Uspesno povezan sa CityService");
  }

  // Dohvati sve gradove
  getCities(): Observable<City[]> {
    return this.http.get<{ [key: string]: City }>(`${this.baseUrl}.json`)
      .pipe(map(citiesData => {
        const cities: City[] = [];
        for (const key in citiesData) {
          if (citiesData.hasOwnProperty(key)) {
            cities.push({
              id: key,
              name: citiesData[key].name,
              imageUrl: citiesData[key].imageUrl,
              description: citiesData[key].description,
              rating: citiesData[key].rating,
              isInFavorites: false
            });
          }
        }
        return cities;
      }));
  }

  getCity(cityId: string): Observable<City> {
    return this.http.get<City>(`${this.baseUrl}/${cityId}.json`);
  }

  getFavoriteCities(userId: string): Observable<{ cityId: string }[]> {
    return this.http.get<{ [key: string]: { cityId: string } }>(`${this.favoritesUrl}/${userId}.json`)
      .pipe(map(favoritesData => {
        const favoriteCities: { cityId: string }[] = [];
        for (const key in favoritesData) {
          if (favoritesData.hasOwnProperty(key)) {
            const { cityId } = favoritesData[key];
            favoriteCities.push({ cityId });
          }
        }
        return favoriteCities;
      }));
  }

  addCityToFavorites(userId: string, cityId: string): Observable<City> {
    console.log("Dodavanje");
    return this.http.post<City>(`${this.favoritesUrl}/${userId}.json`, { cityId });
  }

  removeCityFromFavorites(userId: string, cityId: string): Observable<void> {



    return this.getFavoriteIdByCityId(userId, cityId).pipe(
      switchMap(favoriteId => {
        if (favoriteId) {
          console.log(`Brisanje grada sa favoriteId: ${favoriteId}`);
          return this.http.delete<void>(`${this.favoritesUrl}/${userId}/${favoriteId}.json`).pipe(
            catchError(error => {
              console.error('Greška prilikom brisanja grada iz favorita:', error);
              return throwError(error); // Rethrow the error
            })
          );
        } else {
          throw new Error('City ID nije pronađen u favoritima.');
        }
      })
    );
  }

  // Pomoćna metoda za pronalaženje favoriteId
  public getFavoriteIdByCityId(userId: string, cityId: string): Observable<string | null> {
    console.log("Pozvana");
    return this.http.get<{ [key: string]: { cityId: string } }>(`${this.favoritesUrl}/${userId}.json`)
      .pipe(
        map(favorites => {
          for (const favoriteId in favorites) {
            if (favorites[favoriteId].cityId === cityId) {

              return favoriteId;
            }
          }
          return null;
        }),
        catchError(error => {
          console.error('Greška prilikom pretraživanja favorita:', error);
          return throwError(error);
        })
      );
  }

}

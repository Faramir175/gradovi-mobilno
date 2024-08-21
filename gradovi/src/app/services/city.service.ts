import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city-model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseUrl = `${environment.firebaseConfig.databaseURL}/cities`;
  private favoritesUrl = `${environment.firebaseConfig.databaseURL}/favorites`; // URL za omiljene gradove

  constructor(private http: HttpClient) {
    console.log("Uspesno povezan sa CityService");
  }

  // Dohvati sve gradove
  getCities(): Observable<City[]> {
    console.log("Uspesno");
    return this.http.get<City[]>(`${this.baseUrl}.json`);
  }

  // Dohvati grad po ID-u
  getCity(cityId: string): Observable<City> {
    return this.http.get<City>(`${this.baseUrl}/${cityId}.json`);
  }

  // Dohvati sve omiljene gradove
  getFavoriteCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.favoritesUrl}.json`);
  }

  // Dodaj grad u omiljene
  addCityToFavorites(city: City): Observable<City> {
    return this.http.post<City>(`${this.favoritesUrl}.json`, city);
  }

  // Izbaci grad iz omiljenih
  removeCityFromFavorites(cityId: string): Observable<void> {
    return this.http.delete<void>(`${this.favoritesUrl}/${cityId}.json`);
  }
}

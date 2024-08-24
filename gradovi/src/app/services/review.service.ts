import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map,of, catchError} from 'rxjs';
import { Review } from '../models/review.model';
import { environment } from '../../environments/environment';

import { CityService } from './city.service';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = `${environment.firebaseConfig.databaseURL}/favorites`;
  private reviewsUrl = `${environment.firebaseConfig.databaseURL}/reviews`;
  favoriteId:string = '';

  constructor(
    private http: HttpClient,
    private cityService: CityService
  ) {}

  // Metoda za čuvanje recenzije
  addReview(userId: string, cityId: string, review: any, Grad: string): Observable<any> {
    return this.cityService.getFavoriteIdByCityId(userId, cityId).pipe(
        switchMap(favoriteId => {
            // Proverite da li favoriteId nije null
            if (favoriteId) {
                const reviewData = { ...review, Grad };
    
                return this.http.post(`${this.baseUrl}/${userId}/${favoriteId}.json`, reviewData);
            } else {
                // Možete baciti grešku ili vratiti prazan Observable
                throw new Error('Favorite ID not found');
            }
        })
    );
}


async checkIfOnlyCityIdExists(userId: string, favoriteId: string): Promise<boolean> {
  const url = `${this.baseUrl}/${userId}/${favoriteId}.json`;
  console.log(url);

  try {
    const response = await this.http.get(url).pipe(
      map((response: any) => {
        if (response) {
          const keys = Object.keys(response);
          // Provera da li postoji samo jedan ključ i da li je taj ključ "cityId"
          console.log("Broj kljuceva:", keys.length);
          return keys.length === 1 && keys.includes('cityId');
        } else {
          return false; // Nema podataka, tretiramo kao false
        }
      }),
      catchError((error) => {
        console.error('Greška prilikom preuzimanja podataka:', error);
        return of(false); // Vraća false u slučaju greške
      })
    ).toPromise();
    
    // U slučaju da je rezultat `undefined`, vratiti `false`
    return response ?? false;

  } catch (error) {
    console.error('Greška prilikom preuzimanja podataka:', error);
    return false;
  }
}

  // Metoda za dohvatanje recenzije
  getReview(userId: string, cityId: string): Observable<Review> {
    const reviewUrl = `${this.baseUrl}/${userId}/${cityId}/review.json`;
    return this.http.get<Review>(reviewUrl);
  }
}

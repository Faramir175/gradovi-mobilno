import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map,of, catchError, range} from 'rxjs';
import { Review } from '../models/review.model';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import { CityService } from './city.service';
import { switchMap } from 'rxjs/operators';
import { Rating } from '../models/rating-model';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = `${environment.firebaseConfig.databaseURL}/favorites`;
  private reviewsUrl = `${environment.firebaseConfig.databaseURL}/reviews`;
  private ocenaUrl = `${environment.firebaseConfig.databaseURL}`;
  favoriteId:string = '';
  reviewId:string = '';

  constructor(
    private http: HttpClient,
    private cityService: CityService
  ) {}

  // Metoda za čuvanje recenzije
  addReview(userId: string, cityId: string,  review: any, Grad: string): Observable<any> {
    return this.cityService.getFavoriteIdByCityId(userId, cityId).pipe(
        switchMap(favoriteId => {
            if (favoriteId) {
                const reviewData = { ...review, Grad };
                console.log("Salje se");

                if (this.reviewId) {
                  // Ako reviewId postoji, izvrši PUT zahtev sa reviewId
                  console.log(this.reviewId);
                  return this.http.put(`${this.baseUrl}/${userId}/${favoriteId}/${this.reviewId}.json`, reviewData).pipe(
                    switchMap(() => {
                      return this.http.post(`${this.ocenaUrl}/ocene/${cityId}.json`, { ocena: review.Ocena });
                    })
                  );
                } else {
                  // Ako reviewId nije prisutan, izvrši PUT zahtev bez reviewId
                  return this.http.post(`${this.baseUrl}/${userId}/${favoriteId}.json`, reviewData).pipe(
                    switchMap(() => {
                      return this.http.post(`${this.ocenaUrl}/ocene/${cityId}.json`, { ocena: review.Ocena });
                    })
                  );
                }
            } else {
                throw new Error('Favorite ID not found');
            }
        })
    );
}

getReviewByUserAndCity(userId: string, cityId: string): Observable<any> {
  return this.cityService.getFavoriteIdByCityId(userId, cityId).pipe(
    switchMap(favoriteId => {
      if (favoriteId) {
        console.log("Favorite ID je:",favoriteId);

        // Pozivamo drugu metodu koja vraća reviewId
        return this.getReviewIdByUserId(userId, favoriteId).pipe(
          switchMap(reviewId => {
            if (reviewId) {
              // Sada koristimo reviewId za poziv API-ja
              return this.http.get(`${this.baseUrl}/${userId}/${favoriteId}/${reviewId}.json`);
            } else {
              // U slučaju da reviewId ne postoji
              console.log("Nemamo review ID");
              return of(null);
            }
          })
        );
      } else {
        throw new Error('Favorite ID not found');
      }
    }),

  );
}

public getReviewIdByUserId(userId: string, favoriteId: string): Observable<string | null> {
  const url = `${this.baseUrl}/${userId}/${favoriteId}.json`;
  return this.http.get<any>(url).pipe(
    map((response) => {
      console.log("Resposne:", response);
      if (response) {
        const reviewIds = Object.keys(response);
        console.log(reviewIds.length);
        if(reviewIds.length > 1)
        {
          this.reviewId = reviewIds[0];
          console.log(reviewIds[0]);
        }

        return reviewIds.length > 1 ? reviewIds[0] : null;
      } else {
        console.log("Neuspesno");
        return null;
      }
    }),
    catchError((error) => {
      console.error("Greška prilikom dobijanja reviewId:", error);
      return throwError(() => new Error('Greška prilikom dobijanja reviewId'));
    })
  );
}

getAverageRating(cityId: string): Observable<string> {
  const url = `${this.ocenaUrl}/ocene/${cityId}.json`;
  return this.http.get<{ [key: string]: {ocena :string} }>(url).pipe(
    map(response => {
      if (response) {
        const ratings = Object.values(response) as Rating[];
        if (ratings.length === 0) {
          return '5.00';
        }
        const total = ratings.reduce((sum, rating) => sum + parseFloat(rating.ocena), 0);
        const average = total / ratings.length;
        console.log(total);
        console.log(ratings.length);
        console.log(average);
        return average.toFixed(2);
      } else {
        return 'No ratings';
      }
    }),
    catchError(error => {
      console.error('Greška prilikom dobijanja ocena:', error);
      return throwError('Greška prilikom dobijanja ocena');
    })
  );
}
  deleteReview(userId: string, cityId: string): Observable<any> {
    return this.cityService.getFavoriteIdByCityId(userId, cityId).pipe(
      switchMap(favoriteId => {
        if (favoriteId) {
          return this.getReviewIdByUserId(userId, favoriteId).pipe(
            switchMap(reviewId => {
              if (reviewId) {
                // Ako je reviewId pronađen, obriši ga
                return this.http.delete(`${this.baseUrl}/${userId}/${favoriteId}/${reviewId}.json`);
              } else {
                throw new Error('Recenzija nije pronađena.');
              }
            })
          );
        } else {
          throw new Error('Favorite ID nije pronađen.');
        }
      })
    );
  }
}

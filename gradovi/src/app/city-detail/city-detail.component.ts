import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../services/city.service';
import { City } from '../models/city-model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss']
})
export class CityDetailComponent implements OnInit {
  cityId: string = '';
  userId: string = '';
  city: City = {
    id: '',
    name: '',
    imageUrl: '',
    description: '',
    rating: '',
    isInFavorites: false,
    // Dodajte i ostale potrebne inicijalne vrednosti
  };
  isFavorite: boolean = false;

  review = {
    Ocena: 0,
    Broj_Dana: 0,
    Broj_Ljudi: 0,
    Tip_Smestaja: '',
    Iskustvo: ''
  };

  constructor(
    private route: ActivatedRoute,
    private cityService: CityService,
    private authService: AuthService, 
    private router: Router,
    private reviewService: ReviewService,
  
  ) { }

  ngOnInit(): void {
    // Uzimanje cityId iz route parametara
    this.cityId = this.route.snapshot.paramMap.get('id') as string;
    this.cityService.getCity(this.cityId).subscribe(city => {
      this.city = city;
    });

    const userId = this.authService.getUserId();

    if(userId){
      this.cityService.getFavoriteCities(userId).subscribe(favoriteCities =>{
        this.isFavorite = favoriteCities.some(favorite => favorite.cityId === this.cityId)
      })
    }
  }

  async submitReview() {
    const userId = this.authService.getUserId();
    console.log(userId);
    if (this.cityId && userId) {

      try {
        // Pozovi ifReviewExists kao asinhronu funkciju
        const reviewExists = await this.ifReviewExists();
        console.log(reviewExists);

        if (reviewExists) {
          alert('Već ste ostavili recenziju za ovaj grad.');
        } else {
          this.reviewService.addReview(userId, this.cityId, this.review, this.city?.name).subscribe(() => {
            alert('Vaša recenzija je uspešno poslata!');
            console.log('Recenzija uspešno poslata');
          }, (error: any) => {
            console.error('Greška prilikom slanja recenzije:', error);
          });
        }
      } catch (error) {
        console.error('Greška tokom provere recenzija:', error);
      }
    }
  }

  async ifReviewExists(): Promise<boolean> {
    const userId = this.authService.getUserId();
    if (this.cityId && userId) {
      try {
        const favoriteId = await this.cityService.getFavoriteIdByCityId(userId, this.cityId).toPromise();

        if (favoriteId) {
          const result = await this.reviewService.checkIfOnlyCityIdExists(userId, favoriteId);
          console.log("userID je:", userId);
          console.log("FavoriteID je:", favoriteId);
          console.log("Result je:", result);
          if (!result) {
            console.log('Postoji samo cityId.');
            return true;
          } else {
            console.log('Postoji više od cityId ili nema podataka.');
            return false;
          }
        } else {
          console.log('Nije pronađen favoriteId.');
          return false;
        }
      } catch (error) {
        console.error('Greška tokom proveravanja recenzija:', error);
        return false;
      }
    } else {
      console.log('Nema cityId ili userId.');
      return false;
    }
  }
  

  goBackToCities() {
    this.router.navigate(['/cities']);  // Navigacija na stranicu sa svim gradovima
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);  // Navigacija na stranicu sa omiljenim gradovima
  }
  

  // Metoda za dobijanje detalja o gradu
 
}

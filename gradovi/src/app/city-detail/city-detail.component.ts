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
  averageRating: string = '';
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
    Ocena: '',
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

    this.getAverageRating();

    if(userId){
      this.cityService.getFavoriteCities(userId).subscribe(favoriteCities =>{
        this.isFavorite = favoriteCities.some(favorite => favorite.cityId === this.cityId)
      });

      this.reviewService.getReviewByUserAndCity(userId, this.cityId).subscribe(review => {

        console.log(review);
        if(review)
        {
          this.review = review;
          console.log("Imamo review");
        }
        else{
          console.log("Nemamo review");
        }


      });
    }
  }

  getAverageRating(): void {
    this.reviewService.getAverageRating(this.cityId).subscribe(
      averageRating => {
        this.averageRating = averageRating;
        console.log('Prosečna ocena:', this.averageRating);
      },
      error => {
        console.error('Greška:', error);
      }
    );
  }

   submitReview() {
    const userId = this.authService.getUserId();
    console.log(userId);
    console.log(this.review);
    if (this.cityId && userId) {

      this.reviewService.addReview(userId, this.cityId, this.review, this.city?.name).subscribe(
        response => {
          alert('Vaša recenzija je uspešno poslata');
          this.getAverageRating();
          this.reviewService.getReviewByUserAndCity(userId, this.cityId).subscribe(review => {

            if(review)
            {
              this.review = review;
              console.log("Imamo review");
            }
            else{
              console.log("Nemamo review");
            }


          });
        },
        error => {
          console.error('Greska prilikom dodavanja recenzije:', error);
          alert('Doslo je do greske prilikom slanja recenzije.');
        }
      );
    }else{
      alert('Nisu svi potreni podaci prisutni');
    }

    }

  deleteReview() {
    const userId = this.authService.getUserId();

    if (userId && this.cityId) {
      this.reviewService.deleteReview(userId, this.cityId).subscribe(() => {
        alert('Recenzija je uspešno obrisana.');
      }, error => {
        alert('Nismo uspeli da pronađemo recenziju ili se dogodila greška.');
        console.error('Greška prilikom brisanja recenzije:', error);
      });
    } else {
      alert('Podaci o korisniku ili gradu nisu dostupni.');
    }
  }

  goBackToCities() {
    this.router.navigate(['/cities']);  // Navigacija na stranicu sa svim gradovima
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);  // Navigacija na stranicu sa omiljenim gradovima
  }
}

  // Metoda za dobijanje detalja o gradu



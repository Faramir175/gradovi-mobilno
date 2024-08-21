import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../services/city.service';
import { City } from '../models/city-model';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.scss']
})
export class CityDetailsComponent implements OnInit {
  city!: City;

  constructor(private route: ActivatedRoute, private cityService: CityService) { }

  ngOnInit(): void {
    const cityId = this.route.snapshot.paramMap.get('id');
    if (cityId) {
      this.cityService.getCity(cityId).subscribe((city: City) => {
        this.city = city;
      });
    }
  }
}

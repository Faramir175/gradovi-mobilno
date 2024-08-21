import { TestBed } from '@angular/core/testing';

import { CityInitializerService } from './city-initializer.service';

describe('CityInitializerService', () => {
  let service: CityInitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityInitializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

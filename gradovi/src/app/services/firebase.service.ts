import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private baseUrl = 'https://citytravel-fd59c-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) { }

  // GET: Vrati sve gradove iz Firebase baze
  getCities(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cities.json`);
  }

  // POST: Dodaj novi grad u Firebase bazu
  addCity(city: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/cities.json`, city);
  }

  // PUT: Ažuriraj postojeci grad u Firebase bazi
  updateCity(id: string, city: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/cities/${id}.json`, city);
  }

  // DELETE: Obrisi grad iz Firebase baze
  deleteCity(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cities/${id}.json`);
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Importujte Router

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string | null = '';
  yearOfBirth: number | null = null;
  email: string | null = '';

  constructor(private authService: AuthService, private router: Router) { } // Dodajte Router

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.yearOfBirth = this.authService.getYearOfBirth();
    this.email = this.authService.getEmail();
  }

  logout(): void {
    this.authService.removeToken(); // Uklonite token
    this.router.navigate(['/login']); // Preusmerite na stranicu za prijavu
  }
}

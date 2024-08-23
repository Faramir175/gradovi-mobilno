import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Importujte Router

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private router: Router) { } // Dodajte Router

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.user = {
        email: this.authService.getEmail(), 
        username: this.authService.getUsername(), // Dodajte korisničko ime
        yearOfBirth: this.authService.getYearOfBirth() // Dodajte godinu rođenja
      };
    }
  }

  logout(): void {
    this.authService.removeToken(); // Uklonite token
    this.router.navigate(['/login']); // Preusmerite na stranicu za prijavu
  }
}

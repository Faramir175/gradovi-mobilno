import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string | null = '';
  yearOfBirth: number | null = null;
  email: string | null = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.yearOfBirth = this.authService.getYearOfBirth();
    this.email = this.authService.getEmail();
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']); // Preusmerava na stranicu za prijavu
  }
}

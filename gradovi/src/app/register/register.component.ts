import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  username: string = '';
  yearOfBirth: number | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.email && this.password && this.username && this.yearOfBirth) {
      this.authService.register(this.email, this.password, this.username, this.yearOfBirth)
        .subscribe(
          response => {
            console.log('Uspešno ste se registrovali:', response);
            this.router.navigate(['/login']);
          },
          error => {
            console.error('Greška pri registraciji:', error.message);
            console.error('Detalji greške:', error.error);
          }
        );
    } else {
      console.error('Sva polja su obavezna.');
    }
  }
}

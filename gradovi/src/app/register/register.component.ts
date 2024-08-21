import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Kreiramo AuthService kasnije

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.email, this.password).subscribe(
      response => {
        console.log('Uspešno ste se registrovali:', response);
        this.router.navigate(['/login']); // Preusmeri korisnika na login nakon registracije
      },
      error => {
        console.error('Greška pri registraciji:', error);
      }
    );
  }
}

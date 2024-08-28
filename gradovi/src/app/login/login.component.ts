import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Uspešno ste se ulogovali:', response);
        this.router.navigate(['/cities']); // Preusmerava korisnika na stranicu sa gradovima
      },
      error => {
        console.error('Greška pri logovanju:', error);
      }
    );
  }
}

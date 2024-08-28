import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isLoginOrRegister = state.url === '/login' || state.url === '/register';

    if (isLoginOrRegister) {
      return true; // Dozvoli pristup login i register stranicama
    }

    // Ako niste na login/register stranici, proverite da li ste prijavljeni
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // Preusmerite na stranicu za prijavu
      this.router.navigate(['/login']);
      return false;
    }
  }
}

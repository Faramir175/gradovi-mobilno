import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Gradovi';
  menuEnabled = true; // Kontrola za omogućavanje ili onemogućavanje menija

  constructor(private router: Router, private menu: MenuController) {
    // Pratite promene rute
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Omogućite ili onemogućite meni na osnovu trenutne rute
        this.menuEnabled = event.url !== '/login' && event.url !== '/register';
        
        // Ako je meni onemogućen, zatvorite ga
        if (!this.menuEnabled) {
          this.menu.close('main-menu');
        }
      }
    });
  }

  ngOnInit() {
    // Možete dodati dodatne inicijalizacije ovde
  }
}

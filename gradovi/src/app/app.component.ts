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
  menuEnabled = true;

  constructor(private router: Router, private menu: MenuController) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menuEnabled = event.url !== '/login' && event.url !== '/register';

        if (!this.menuEnabled) {
          this.menu.close('main-menu');
        }
      }
    });
  }

  ngOnInit() {
    // 75
  }
}

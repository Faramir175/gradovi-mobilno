import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => console.log('Aplikacija uspešno pokrenuta!'))
  .catch(err => console.error('Greška prilikom pokretanja aplikacije:', err));

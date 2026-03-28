import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/routes/auth.routes').then(r => r.authRoutes)
  },
  {
    path: 'reactive',
    loadChildren: () =>  import('./reactive/routes/reactive.routes').then(r => r.reactiveRoutes)
  },
  {
    path: 'country',
    loadChildren: () => import('./country/routes/country.routes').then(r => r.countryRoutes)
  },
  {
    path: '**',
    redirectTo: 'reactive'
  }
];

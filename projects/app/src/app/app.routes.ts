import { Routes } from '@angular/router';

export const routes: Routes = [
  /* {
    path: "**",
    redirectTo: "/login"
  }, */
  /*  {
     path: '',
     redirectTo: 'app/login',
     pathMatch: 'full'
   }, */
  {
    path: 'app',
    loadChildren: () => import('users').then(m => m.usersRoutes)
  },
  /* {
    path: "**",
    redirectTo: '' // esta ruta ahora redirige a '', que a su vez redirige a 'app/login' o a la que corresponda
  } */
];




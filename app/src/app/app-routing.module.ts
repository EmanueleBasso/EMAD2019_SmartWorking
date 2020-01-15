import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import AuthGuard from './providers/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'sw',
    loadChildren: './sw/sw.module#SwPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'progetti',
    loadChildren: './progetti/progetti.module#ProgettiPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: './notifications/notifications.module#NotificationsComponentModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'calendario-dipendenti',
    loadChildren: './calendario-dipendenti/calendario-dipendenti.module#CalendarioDipendentiPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'piantina',
    loadChildren: './piantina/piantina.module#PiantinaModule',
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

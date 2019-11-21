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
    // loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  { path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },  {
    path: 'sw',
    loadChildren: () => import('./sw/sw.module').then( m => m.SwPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

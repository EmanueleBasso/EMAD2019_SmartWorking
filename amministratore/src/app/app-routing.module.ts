import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'progetti',
    loadChildren: () => import('./progetti/progetti.module').then( m => m.ProgettiPageModule)
  },
  {
    path: 'dipendenti',
    loadChildren: () => import('./dipendenti/dipendenti.module').then( m => m.DipendentiPageModule)
  },
  {
    path: 'form-progetti',
    loadChildren: () => import('./form-progetti/form-progetti.module').then( m => m.FormProgettiPageModule)
  },
  {
    path: 'form-dipendenti',
    loadChildren: () => import('./form-dipendenti/form-dipendenti.module').then( m => m.FormDipendentiPageModule)
  },
  {
    path: 'form-dipendenti',
    loadChildren: () => import('./form-dipendenti/form-dipendenti.module').then( m => m.FormDipendentiPageModule)
  },
  {
    path: 'associa-dipendenti',
    loadChildren: () => import('./associa-dipendenti/associa-dipendenti.module').then( m => m.AssociaDipendentiPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

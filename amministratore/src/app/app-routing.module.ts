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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

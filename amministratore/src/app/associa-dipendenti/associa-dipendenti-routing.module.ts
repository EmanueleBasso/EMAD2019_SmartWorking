import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssociaDipendentiPage } from './associa-dipendenti.page';

const routes: Routes = [
  {
    path: '',
    component: AssociaDipendentiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssociaDipendentiPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormDipendentiPage } from './form-dipendenti.page';

const routes: Routes = [
  {
    path: '',
    component: FormDipendentiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormDipendentiPageRoutingModule {}

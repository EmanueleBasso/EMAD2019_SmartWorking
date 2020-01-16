import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormProgettiPage } from './form-progetti.page';

const routes: Routes = [
  {
    path: '',
    component: FormProgettiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormProgettiPageRoutingModule {}

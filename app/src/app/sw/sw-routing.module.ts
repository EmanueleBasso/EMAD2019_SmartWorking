import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwPage } from './sw.page';

const routes: Routes = [
  {
    path: '',
    component: SwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwPageRoutingModule {}

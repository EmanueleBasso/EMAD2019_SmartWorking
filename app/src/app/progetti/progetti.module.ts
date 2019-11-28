import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ProgettiPage } from './progetti.page';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CalendarModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProgettiPage
      }
    ])
  ],
  declarations: [ProgettiPage]
})
export class ProgettiPageModule {
  constructor() { }
}

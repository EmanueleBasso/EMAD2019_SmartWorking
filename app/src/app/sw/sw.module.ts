import { CalendarModule } from 'ion2-calendar';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SwPage } from './sw.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CalendarModule,
    RouterModule.forChild([
      {
        path: '',
        component: SwPage
      }
    ])
  ],
  declarations: [SwPage]
})
export class SwPageModule {
  constructor() {}
}

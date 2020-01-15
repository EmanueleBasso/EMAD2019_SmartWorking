import { CalendarModule } from 'ion2-calendar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PiantinaComponent } from './piantina.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CalendarModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: PiantinaComponent
      }
    ])
  ],
  declarations: [PiantinaComponent]
})
export class PiantinaModule {
  constructor() { }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioDipendentiPage } from './calendario-dipendenti.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CalendarioDipendentiPage
      }
    ])
  ],
  declarations: [CalendarioDipendentiPage]
})
export class CalendarioDipendentiPageModule { }

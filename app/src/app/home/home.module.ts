import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
//import { CalendarioModule } from '../calendar/calendario.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    //CalendarioModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage],
})
export class HomePageModule {
  constructor() { }
}

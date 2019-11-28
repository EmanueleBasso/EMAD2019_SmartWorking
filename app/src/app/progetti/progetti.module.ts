import { NotificationsComponentModule } from './../notifications/notifications.module';
import { CalendarioModule } from './../calendar/calendario.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ProgettiPage } from './progetti.page';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CalendarioModule,
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

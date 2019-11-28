import { CalendarModule } from 'ion2-calendar';
import { NotificationsComponent } from './notifications.component';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule, CalendarModule, CommonModule, FormsModule,
  ],
  declarations: [NotificationsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA]
})
export class NotificationsComponentModule {
  constructor() { }
}

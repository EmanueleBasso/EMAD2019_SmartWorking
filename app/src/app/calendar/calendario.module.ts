import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { CalendarModule } from 'ion2-calendar';
import { MultiCalendarComponent } from './multi-calendar.component';
import { BasicCalendarComponent } from './basic-calendar.component';
import { RangeCalendarComponent } from './range-calendar.component';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [
  MultiCalendarComponent,
  BasicCalendarComponent,
  RangeCalendarComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [IonicModule, CalendarModule, CommonModule,
    IonicModule, FormsModule,
  ],
  exports: [COMPONENTS],
})
export class CalendarioModule {
}

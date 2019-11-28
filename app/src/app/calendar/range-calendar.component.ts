import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  CalendarComponentOptions,
} from 'ion2-calendar';
import * as moment from 'moment';
@Component({
  selector: 'app-range-calendar',
  templateUrl: './range-calendar.component.html',
  styleUrls: ['./calendar.scss']
})
export class RangeCalendarComponent {
  dateRange: { from: string; to: string };
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
  };

  constructor(public modalCtrl: ModalController) {
    moment.locale('it-IT');
  }
}

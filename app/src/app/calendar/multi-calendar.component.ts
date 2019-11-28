import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  CalendarComponentOptions,
} from 'ion2-calendar';
import * as moment from 'moment';

@Component({
  selector: 'app-multi-calendar',
  templateUrl: './multi-calendar.component.html',
  styleUrls: ['./calendar.scss']
})
export class MultiCalendarComponent {
  dateMulti: string[];
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
  };
  date: Date = new Date();

  constructor(public modalCtrl: ModalController) {
    moment.locale('it-IT');
  }
}

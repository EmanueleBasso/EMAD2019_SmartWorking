import { Component, Input } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';

import * as moment from 'moment';
import { CalendarModalOptions } from 'ion2-calendar';

@Component({
  selector: 'app-basic-calendar',
  templateUrl: './basic-calendar.component.html',
  styleUrls: ['./calendar.scss'],
})
export class BasicCalendarComponent {
  @Input() colore: string;

  constructor(public modalCtrl: ModalController, public events: Events) {
    moment.locale('it-IT');
    this.colore = 'optionsBasicDanger';
  }

  date: string;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsBasicPrimary: CalendarModalOptions = {
    color: 'primary'
  };
  optionsBasicDanger: CalendarModalOptions = {
    color: 'danger'
  };

  onChange($event) {
    const data = new Date($event._i);
    this.events.publish('data_changed', data.getDate(), data.getMonth() + 1, data.getFullYear());
  }
}

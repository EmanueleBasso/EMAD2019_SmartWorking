import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';

import * as moment from 'moment';
import { CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  // Dati lista
  private selectedItem: any;
  private icons = ['home', 'desktop'];
  public items: Array<{ title: string; icon: string, note: string; }> = [];
  private giorni: string[];
  private num: number;
  click: boolean = false;

  constructor(public modalCtrl: ModalController) {
    moment.locale('it-IT');

    this.giorni = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'];
    for (let i = 0; i < 5; i++) {
      this.num = Math.floor(Math.random() * this.icons.length);
      this.items.push({
        title: this.giorni[i],
        icon: this.icons[this.num],
        note: ((this.num === 1) ? ('Posto ' + i + ' Stanza ' + (i + i) + ' Piano ' + (i + 1)) : '')
      });
    }
  }

  // CALENDARIO
  date1: string;
  date2: Date = new Date(); //Facendo new Date() viene automaticamente restituito la data corrente (di oggi)
  arrayData: string[];
  _color: string = 'primary';
  //_showToggleButtons: boolean = false;
  //_showMonthPicker: boolean = false;
  //_disableWeeks: number[] = [0, 6];
  //_weekStart: number = 0;
  options1: CalendarComponentOptions = {
    color: this._color,
    // showMonthPicker: false,
    // showToggleButtons: false,
  };
  options2: CalendarComponentOptions = {
    color: 'danger',
    // showMonthPicker: false,
    // showToggleButtons: false,
  };

  /*_changeColors(color: string) {
    this.options = {
      ...this.options,
      color
    };
  }

  _changeShowToggleButtons(showToggleButtons: boolean) {
    this.options = {
      ...this.options,
      showToggleButtons
    };
  }

  _changeShowMonthPicker(showMonthPicker: boolean) {
    this.options = {
      ...this.options,
      showMonthPicker
    };
  }

  _changeDisableWeeks(disableWeeks: string[]) {
    this.options = {
      ...this.options,
      disableWeeks: disableWeeks.map(e => parseInt(e))
    };
  }

  _changeWeekStart(weekStart: string) {
    this.options = {
      ...this.options,
      weekStart: parseInt(weekStart)
    };
  }*/


  onChange1($event) {
    console.log("Stringa del calendario 1: " + $event);
  }
  onChange2($event) {
    this.arrayData = $event._d.toString().split(' ', 4);
    console.log("Array del calendario 2: " + this.arrayData);
  }

  itemClick() {
    this.click = !this.click;
    // L'ho messo qui il log della data di oggi perché ho usato una sola variabile per tutto :)
    this.arrayData = this.date2.toString().split(' ', 4);
    console.log("Data di oggi: " + this.arrayData);
  }
}

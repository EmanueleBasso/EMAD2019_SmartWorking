import { Component, OnInit } from '@angular/core';

import { ModalController, MenuController } from '@ionic/angular';

import * as moment from 'moment';
import { CalendarComponentOptions, DayConfig } from 'ion2-calendar';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  // Dati lista
  private icons = ['home', 'business'];
  public items: Array<{ title: string; icon: string, note: string; }> = [];
  private giorni: string[];
  private num: number;
  click: boolean = false;
  private haPrenotatoPosto = false;
  private _daysConfig: DayConfig[] = [];

  // CALENDARIO
  date1: string;
  date2: Date = new Date(); // Facendo new Date() viene automaticamente restituito la data corrente (di oggi)
  arrayData: string[];
  _color: string = 'primary';

  options: CalendarComponentOptions = {
    color: this._color,
    daysConfig: this._daysConfig,
    // showMonthPicker: false,
    // showToggleButtons: false,
  };

  constructor(private modalCtrl: ModalController, private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(true);
    moment.locale('it-IT');

    this.giorni = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'];
    for (let i = 0; i < 5; i++) {
      this.num = Math.floor(Math.random() * this.icons.length);
      this.items.push({
        title: this.giorni[i],
        icon: this.icons[this.num],
        note: ((this.num === 1) ? ('Posto ' + i + ' Stanza ' + (i + i) + ' Piano ' + (i + 1)) : 'Sei a casa')
      });
    }
    for (let i = 1; i < 10; i++) {
      this._daysConfig.push({
        date: new Date(2020, i, i + 1),
        disable: true,
        subTitle: 'bloccato', // al massimo 8 lettere altrimenti graficamente è brutto
      });
    }
  }

  onChange($event) {
    console.log("Stringa del calendario 1: " + $event);
  }

  itemClick() {
    this.click = !this.click;
    // L'ho messo qui il log della data di oggi perché ho usato una sola variabile per tutto :)
    this.arrayData = this.date2.toString().split(' ', 4);
    console.log("Data di oggi: " + this.arrayData);
    if (!this.haPrenotatoPosto) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].note !== 'Sei a casa') {
          this.items[i].note = 'Non hai scelto il posto';
        }
      }
    }
  }

  // Swipe per il menu laterale
  handleSwipe() {
    this.menu.open();
  }
}

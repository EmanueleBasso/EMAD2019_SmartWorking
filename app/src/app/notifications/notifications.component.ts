import { CalendarComponentOptions } from 'ion2-calendar';
import { PopoverController } from '@ionic/angular';
import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})

export class NotificationsComponent {
  nomeGiorno: string;
  nomeMese: string;
  titoloNotifica: string;
  private bottoneCliccato: string;

  type: Date; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  options: CalendarComponentOptions = {
    color: 'danger',
    // showMonthPicker: false,
    // showToggleButtons: false,
  };
  day: string;

  constructor(public popoverCtrl: PopoverController) {
    moment.locale('it-IT');

    const date: Date = new Date();
    switch (date.getDay()) {
      case 1: this.nomeGiorno = 'Lun'; break;
      case 2: this.nomeGiorno = 'Mar'; break;
      case 3: this.nomeGiorno = 'Mer'; break;
      case 4: this.nomeGiorno = 'Gio'; break;
      case 5: this.nomeGiorno = 'Ven'; break;
      case 6: this.nomeGiorno = 'Sab'; break;
      case 7: this.nomeGiorno = 'Dom'; break;
    }

    switch (date.getMonth() + 1) {
      case 1: this.nomeMese = 'Gen'; break;
      case 2: this.nomeMese = 'Feb'; break;
      case 3: this.nomeMese = 'Mar'; break;
      case 4: this.nomeMese = 'Apr'; break;
      case 5: this.nomeMese = 'Mag'; break;
      case 6: this.nomeMese = 'Giu'; break;
      case 7: this.nomeMese = 'Lug'; break;
      case 8: this.nomeMese = 'Ago'; break;
      case 9: this.nomeMese = 'Sett'; break;
      case 10: this.nomeMese = 'Ott'; break;
      case 11: this.nomeMese = 'Nov'; break;
      case 12: this.nomeMese = 'Dic'; break;
    }

    this.titoloNotifica = this.nomeGiorno + ' ' + date.getDate() + ' ' + this.nomeMese + ' ' + date.getFullYear();
  }

  onChange($event) {
    const data = ($event._d + '').substring(0, 15);
    const split = data.split(' ');
    console.log(data);
    switch (split[0]) {
      case 'Mon': this.nomeGiorno = 'Lun'; break;
      case 'Tue': this.nomeGiorno = 'Mar'; break;
      case 'Wed': this.nomeGiorno = 'Mer'; break;
      case 'Thu': this.nomeGiorno = 'Gio'; break;
      case 'Fri': this.nomeGiorno = 'Ven'; break;
      case 'Sat': this.nomeGiorno = 'Sab'; break;
      case 'Sun': this.nomeGiorno = 'Dom'; break;
    }
    switch (split[1]) {
      case 'Jan': this.nomeMese = 'Gen'; break;
      case 'Feb': this.nomeMese = 'Feb'; break;
      case 'Mar': this.nomeMese = 'Mar'; break;
      case 'Apr': this.nomeMese = 'Apr'; break;
      case 'May': this.nomeMese = 'Mag'; break;
      case 'Jun': this.nomeMese = 'Giu'; break;
      case 'Jul': this.nomeMese = 'Lug'; break;
      case 'Aug': this.nomeMese = 'Ago'; break;
      case 'Sep': this.nomeMese = 'Sett'; break;
      case 'Oct': this.nomeMese = 'Ott'; break;
      case 'Nov': this.nomeMese = 'Nov'; break;
      case 'Dec': this.nomeMese = 'Dic'; break;
    }
    this.titoloNotifica = this.nomeGiorno + ' ' + split[2] + ' ' + this.nomeMese + ' ' + split[3];
  }

  onClickNotification(str: string) {
    if (str === 'conferma') {
      console.log('hai annullato');
    } else {
      console.log('hai annullato');
    }
    this.popoverCtrl.dismiss({scelta: str, giorno: this.titoloNotifica});
  }
}

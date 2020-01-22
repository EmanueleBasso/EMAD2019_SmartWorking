import { CalendarComponentOptions } from 'ion2-calendar';
import { PopoverController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})

export class NotificationsComponent implements OnInit {
  nomeGiorno: string;
  nomeMese: string;
  titoloNotifica: string;
  giornoSelezionato: string;
  private posto: string;
  private selectedDays: Array<string> = [];

  type: Date; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  options: CalendarComponentOptions = {
    showAdjacentMonthDay: false,
  };
  day: string;

  constructor(private popoverCtrl: PopoverController, private navParams: NavParams) { }

  ngOnInit() {
    this.options.daysConfig = this.navParams.get('daysBlocked');
    this.options.pickMode = this.navParams.get('pickMode');
    this.posto = this.navParams.get('posto');
    this.options.color = this.navParams.get('color');

    moment.locale('it-IT');

    if (this.posto == null) {
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
        case 9: this.nomeMese = 'Set'; break;
        case 10: this.nomeMese = 'Ott'; break;
        case 11: this.nomeMese = 'Nov'; break;
        case 12: this.nomeMese = 'Dic'; break;
      }

      this.titoloNotifica = this.nomeGiorno + ' ' + date.getDate() + ' ' + this.nomeMese + ' ' + date.getFullYear();
    } else {
      const dataTo = new Date();

      if (dataTo.getMonth() === 11) {
        dataTo.setDate(31);
        dataTo.setMonth(0);
        dataTo.setFullYear(dataTo.getFullYear() + 1);
      } else {
        dataTo.setMonth(dataTo.getMonth() + 1);

        let giorno = 31;
        switch (dataTo.getMonth()) {
          case 3:
          case 5:
          case 8:
          case 10:
            giorno = 30;
            break;
          case 1:
            giorno = 28;

            // Bisestile
            if (dataTo.getFullYear() % 400 === 0) {
              giorno = giorno + 1;
            } else if (((dataTo.getFullYear() % 4) === 0) && ((dataTo.getFullYear()) % 100 !== 0)) {
              giorno = giorno + 1;
            }

            break;
        }

        if (this.options.color == null) {
          this.options.color = 'danger';
        }

        dataTo.setDate(giorno);
      }

      this.options.to = dataTo;

      this.titoloNotifica = "Posto n° " + this.posto;
    }
  }

  onChange($event) {
    const data = ($event._d + '').substring(0, 15);
    const split = data.split(' ');
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
      case 'Sep': this.nomeMese = 'Set'; break;
      case 'Oct': this.nomeMese = 'Ott'; break;
      case 'Nov': this.nomeMese = 'Nov'; break;
      case 'Dec': this.nomeMese = 'Dic'; break;
    }

    if (this.posto == null) {
      this.titoloNotifica = this.nomeGiorno + ' ' + split[2] + ' ' + this.nomeMese + ' ' + split[3];
      this.giornoSelezionato = this.titoloNotifica;
    }
    else {
      this.selectedDays = $event;
    }
  }

  onClickNotification(str: string) {
    if (this.posto == null) {
      this.popoverCtrl.dismiss({ scelta: str, giorno: this.giornoSelezionato });
    } else {
      this.popoverCtrl.dismiss({ scelta: str, date: this.selectedDays });
    }
  }
}

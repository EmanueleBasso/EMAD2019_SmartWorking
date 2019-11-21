import { CalendarComponentOptions } from 'ion2-calendar';
import { ModalController, ToastController, AlertController, NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-sw',
  templateUrl: './sw.page.html',
  styleUrls: ['./sw.page.scss'],
})
export class SwPage {

  // CALENDARIO
  date: Date;
  date2: string[];

  arrayData: string[];
  _color: string = 'primary';
  //_showToggleButtons: boolean = false;
  //_showMonthPicker: boolean = false;
  //_disableWeeks: number[] = [0, 6];
  //_weekStart: number = 0;

  constructor(public alertController: AlertController, private toastCtrl: ToastController, private navCtrl: NavController
  ) {
    moment.locale('it-IT');
    this.date = new Date();
  }

  options: CalendarComponentOptions = {
    color: this._color,
    from: new Date(2019, 11, 1),
    to: new Date(2019, 11, 31),
    showMonthPicker: false,
    pickMode: 'multi',
    showToggleButtons: true,
  };

  onChange($event) {
    console.log($event);
  }

  async _toastWrap(event: string, payload: {}) {
    let toast = this.toastCtrl.create({
      message: `${event}: ${JSON.stringify(payload, null, 2)}`,
      duration: 1000,
    });
    (await toast).present();
  }

  monthChange($event) {
    console.log('monthChange', $event);
    this._toastWrap('monthChange', $event);
  }

  // Prenota SW
  onClickPrenotaSW() {
    this.prenotato = true;
  }


  // ALERT
  prenotato: boolean = true;

  async presentAlertPrenotato() {
    const alert = await this.alertController.create({
      header: 'Hai già prenotato lo SW',
      message: 'per il mese' + this.date,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.navCtrl.navigateBack('/home');
          }
        }
      ]
    });
    await alert.present();
  }

  ionViewWillEnter() {
    if (this.prenotato) {
      this.presentAlertPrenotato();
    }
  }
}

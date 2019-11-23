import { CalendarComponentOptions } from 'ion2-calendar';
import { ToastController, AlertController, NavController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-sw',
  templateUrl: './sw.page.html',
  styleUrls: ['./sw.page.scss'],
})
export class SwPage {

  private loading: any;
  private date: Date;
  private selectedDays: Array<string>;

  arrayData: string[];
  _color: string = 'primary';
  //_showToggleButtons: boolean = false;
  //_showMonthPicker: boolean = false;
  //_disableWeeks: number[] = [0, 6];
  //_weekStart: number = 0;

  constructor(public alertController: AlertController, private toastCtrl: ToastController, private navCtrl: NavController,
              private http: HttpClient, public loadingController: LoadingController) {
    moment.locale('it-IT');
    this.date = new Date();

    const dataFrom = new Date();
    const dataTo = new Date();

    if (this.date.getMonth() === 11) {
      dataFrom.setDate(1);
      dataFrom.setMonth(0);
      dataFrom.setFullYear(dataFrom.getFullYear() + 1);

      dataTo.setDate(31);
      dataTo.setMonth(0);
      dataTo.setFullYear(dataFrom.getFullYear() + 1);
    } else {
      dataFrom.setDate(1);
      dataFrom.setMonth(dataFrom.getMonth() + 1);
      dataFrom.setFullYear(dataFrom.getFullYear());

      let giorno = 31;
      switch (dataFrom.getMonth() + 1) {
        case 3:
        case 5:
        case 8:
        case 10:
          giorno = 30;
          break;
        case 1:
          giorno = 28;

          // Bisestile
          if (dataFrom.getFullYear() % 400 === 0) {
            giorno = giorno + 1;
          } else if (((dataFrom.getFullYear() % 4) === 0) && ((dataFrom.getFullYear()) % 100 !== 0)) {
            giorno = giorno + 1;
          }

          break;
      }

      dataTo.setDate(giorno);
      dataTo.setMonth(dataTo.getMonth() + 1);
      dataTo.setFullYear(dataTo.getFullYear());
    }

    this.options.from = dataFrom;
    this.options.to = dataTo;
  }

  options: CalendarComponentOptions = {
    color: this._color,
    showMonthPicker: false,
    pickMode: 'multi',
    showToggleButtons: true,
  };

  onChange($event) {
    this.selectedDays = $event;
  }

  async presentAlertPrenotato() {
    const alert = await this.alertController.create({
      header: 'Attenzione',
      message: 'Hai già prenotato lo Smart Working per il prossimo mese',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.navigateBack('/home');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertPrimaDel15(giorno) {
    const alert = await this.alertController.create({
      header: 'Attenzione',
      message: 'La prenotazione del piano sarà disponibile tra ' + (15 - giorno) + ' giorno',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.navigateBack('/home');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertGiorniDisponibili() {
    const alert = await this.alertController.create({
      header: 'Attenzione',
      message: 'Puoi selezionare altri giorni di Smart Working. Vuoi proseguire lo stesso?',
      buttons: [
        {
          text: 'NO',
        },
        {
          text: 'SI',
          handler: () => {
            this.saveSW();
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertTroppiGiorniSW(giorni) {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Puoi selezionare al massimo ' + giorni + ' giorni di Smart Working alla settimana. Rivedi le tue scelte',
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    await alert.present();
  }

  async presentAlertSWSalvatoCorrettamente() {
    const alert = await this.alertController.create({
      header: 'Successo',
      message: 'Il piano di Smart Working è stato salvato correttamente per il mese successivo',
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    await alert.present();
  }

  async presentAlertSWErrore() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Si è verificato un problema nel salvataggio del piano di Smart Working. Si prega di riprovare',
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    await alert.present();
  }

  async presentAlertSWErroreUltimaSettimanaMesePrecedente() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Le tue scelte sono incompatibili con il piano di Smart Working del mese precedente. Hai + \
                già selezionato dei giorni per la prima settimana',
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    await alert.present();
  }

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Aspetta...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }

  onClickPrenotaSW() {
    if ((this.selectedDays === undefined) || (this.selectedDays.length === 0)) {
      return;
    }

    const returnValue = this.checkNForWeek();
    if (returnValue === 1) {
      // tutto ok
      this.saveSW();
    } else if (returnValue === 0) {
      // può ancora selezionare giorni
      this.presentAlertGiorniDisponibili();
    } else {
      // errore perchè ha scelto troppi giorni di Smart Working
      this.presentAlertTroppiGiorniSW(2);
    }
  }

  checkNForWeek() {
    const maxSWDaysWeek = 2;
    let numWeek = 0;

    if ((this.selectedDays.length === 1) && (this.selectedDays.length < maxSWDaysWeek)) {
      return 0;
    }

    const selectedDaysSorted = this.selectedDays.sort((o1, o2) => {
      const arrayData1 = o1.split('-');
      const data1 = new Date(parseInt(arrayData1[2]), parseInt(arrayData1[1]), parseInt(arrayData1[0]));
      const arrayData2 = o2.split('-');
      const data2 = new Date(parseInt(arrayData2[2]), parseInt(arrayData2[1]), parseInt(arrayData2[0]));

      if (data1.getTime() < data2.getTime()) {
        return -1;
      } else if (data1.getTime() > data2.getTime()){
        return 1;
      } else {
        return  0;
      }
    });

    let lessSelected = 1;
    let numDaysForWeek = maxSWDaysWeek;
    let lastWeekNumber = -1;
    for (let i = 0; i < selectedDaysSorted.length; i = i + 1) {
      const arrayDay = selectedDaysSorted[i].split('-');
      const dateTmp = new Date(parseInt(arrayDay[0]), parseInt(arrayDay[1]) - 1, parseInt(arrayDay[2]));

      const weekNumber = this.getWeekNumber(dateTmp);
      if (weekNumber === lastWeekNumber) {
        numDaysForWeek = numDaysForWeek + 1;
      } else {
        if (numDaysForWeek < maxSWDaysWeek) {
          lessSelected = 0;
        }

        numDaysForWeek = 1;
        lastWeekNumber = weekNumber;
        numWeek = numWeek + 1;
      }

      if (numDaysForWeek > maxSWDaysWeek) {
        return -1;
      }
    }

    if (lessSelected === 0) {
      return 0;
    }

    if (numDaysForWeek < maxSWDaysWeek) {
      return 0;
    }

    let dateFromTmp = new Date((this.options.from as Date).getTime()) as Date;
    while (true) {
      const dayOfWeek = dateFromTmp.getUTCDay();

      if ((dayOfWeek === 0) || (dayOfWeek === 6)) {
        dateFromTmp = new Date(dateFromTmp.getFullYear(), dateFromTmp.getMonth(), dateFromTmp.getDate() + 1);
      } else {
        break;
      }
    }

    let dataToTmp = new Date((this.options.to as Date).getTime()) as Date;
    while (true) {
      const dayOfWeek = dataToTmp.getUTCDay();

      if ((dayOfWeek === 0) || (dayOfWeek === 6)) {
        dataToTmp = new Date(dataToTmp.getFullYear(), dataToTmp.getMonth(), dataToTmp.getDate() - 1);
      } else {
        break;
      }
    }

    const firstWeekOfMonth = this.getWeekNumber(dateFromTmp);
    let lastWeekOfMonth = this.getWeekNumber(dataToTmp);
    if (lastWeekOfMonth === 1) {
      lastWeekOfMonth = 53;
    }

    if (numWeek < (lastWeekOfMonth - firstWeekOfMonth + 1)) {
      return 0;
    }

    return 1;
  }

  getWeekNumber(data: Date) {
    const d = new Date(Date.UTC(data.getFullYear(), data.getMonth(), data.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  saveSW() {
    this.presentLoadingWithOptions();

    const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/saveSW';
    const body = {};

    body['dates'] = [];
    for (let i = 0; i < this.selectedDays.length; i = i + 1) {
      const arrayDay = this.selectedDays[i].split('-');

      body['dates'].push({anno: arrayDay[0], mese: arrayDay[1], giorno: arrayDay[2]});
    }

    body['uid'] = localStorage.getItem('uid');

    this.http.post(url, JSON.stringify(body)).subscribe( response => {
      const hasError = response['hasError'];
      const error = response['error'];

      this.loading.dismiss();
      if (hasError === false) {
        this.presentAlertSWSalvatoCorrettamente();
      } else if ((hasError === true) && (error === 'Hai selezionato più di due giorni di Smart Working nella stessa settimana')) {
        this.presentAlertSWErroreUltimaSettimanaMesePrecedente();
      } else {
        this.presentAlertSWErrore();
      }
    });
  }

  ionViewWillEnter() {
    const giorno = this.date.getDate();

    if (giorno < 15) {
      this.presentAlertPrimaDel15(giorno);
    } else {
      this.presentLoadingWithOptions();

      const uid = localStorage.getItem('uid');
      const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/checkSWAlreadyEntered';

      this.http.get(url + '?uid=' + uid).subscribe( response => {
        const alreadyEntered = response['alreadyEntered'];

        this.loading.dismiss();
        if (alreadyEntered) {
          this.presentAlertPrenotato();
        } else {
          let node = document.querySelector('#btnToDisable') as HTMLElement;
          node.click();
          node['disabled'] = true;
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuController, AlertController } from '@ionic/angular';

import * as moment from 'moment';
import { CalendarComponentOptions, DayConfig } from 'ion2-calendar';
import LoadingService from '../providers/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  // Dati lista
  private icons = ['home', 'business', 'warning'];
  public items: Array<{}> = [];
  private giorni: string[] = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'];

  private _daysConfig: DayConfig[] = [];
  private start;
  private finish;

  // CALENDARIO
  date1: string;
  date2: Date = new Date(); // Facendo new Date() viene automaticamente restituito la data corrente (di oggi)
  arrayData: string[];
  _color: string = 'primary';

  options: CalendarComponentOptions = {
    color: this._color,
    daysConfig: this._daysConfig,
  };

  constructor(private menu: MenuController, private http: HttpClient,
    private loadingService: LoadingService, private alertController: AlertController) { }

  ngOnInit() {
    this.menu.enable(true);
    moment.locale('it-IT');

    const data = new Date();

    this.caricaInformazioni(new Date(data.getFullYear(), data.getMonth(), data.getDate()));
  }

  async presentAlert3(header, message) {
    const alert = await this.alertController.create({
      header: header,
      cssClass: 'alertClass2',
      message: message,
      buttons: [
        {
          text: 'OK',
          cssClass: 'alertConfirm',
        }
      ]
    });
    await alert.present();
  }

  onChange($event) {
    const dataSplit = $event.split('-');

    const data = new Date(dataSplit[0], parseInt(dataSplit[1]) - 1, dataSplit[2]);

    this.caricaInformazioni(data);
  }

  // Swipe per il menu laterale
  handleSwipe() {
    this.menu.open();
  }

  caricaInformazioni(data) {
    this.loadingService.presentLoading('Aspetta...').then(() => {
      this.start = new Date(data.getTime());
      this.finish = new Date(data.getTime());

      switch (data.getDay()) {
        case 1: this.finish.setDate(data.getDate() + 4);
          break;
        case 2: this.start.setDate(data.getDate() - 1);
          this.finish.setDate(data.getDate() + 3);
          break;
        case 3: this.start.setDate(data.getDate() - 2);
          this.finish.setDate(data.getDate() + 2);
          break;
        case 4: this.start.setDate(data.getDate() - 3);
          this.finish.setDate(data.getDate() + 1);
          break;
        case 5: this.start.setDate(data.getDate() - 4);
          break;
      }

      const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/home';
      const body = {};

      body['dates'] = [];
      body['dates'][0] = {
        giorno: this.start.getDate(),
        mese: this.start.getMonth() + 1,
        anno: this.start.getFullYear(),
      };
      body['dates'][1] = {
        giorno: this.finish.getDate(),
        mese: this.finish.getMonth() + 1,
        anno: this.finish.getFullYear(),
      };
      body['uid'] = localStorage.getItem('uid');

      this.http.post(url, JSON.stringify(body)).subscribe(response => {
        const hasError = response['hasError'];

        this.loadingService.dismissLoading();

        if (hasError !== undefined) {
          this.presentAlert3('Errore', 'Si è verificato un errore. Provare a riaccedere alla pagina');
          return;
        } else {
          this.items = [];

          let data1 = new Date(this.start.getTime());

          for (let i = 0; i < 5; i++) {
            const obj = {
              number: i,
              title: this.giorni[i]
            };

            let found = false;
            for (let j = 0; j < (response as []).length; j++) {
              let dataRes = new Date(response[j]['anno'], parseInt(response[j]['mese']) - 1, response[j]['giorno']);

              if (data1.getTime() == dataRes.getTime()) {
                if ((response[j]['isSmartWorkingDay'] !== undefined)) {
                  obj['icon'] = this.icons[0];
                  obj['note'] = 'Lavori da casa';
                  found = true;
                  break;
                } else if ((response[j]['isCompanyDay'] !== undefined)) {
                  obj['icon'] = this.icons[1];
                  obj['note'] = 'Posto: ' + response[j]['postazione'].replace(/[^0-9]/g, '') + ', Stanza: ' + response[j]['stanza'] + ', Piano: ' + response[j]['piano'];
                  found = true;
                  break;
                }
              }
            }

            if (!found) {
              obj['icon'] = this.icons[2];
              obj['note'] = 'Non hai ancora scelto';
            }

            this.items.push(obj);

            data1.setDate(data1.getDate() + 1);
          }
        }
      });
    });
  }
}

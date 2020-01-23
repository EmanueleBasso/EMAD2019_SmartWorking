import * as Hammer from 'hammerjs';

import { NotificationsComponent } from './../notifications/notifications.component';

import { HttpClient } from '@angular/common/http';
import { AlertController, MenuController, PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DayConfig, CalendarComponentOptions } from 'ion2-calendar';
import LoadingService from '../providers/loading.service';

@Component({
  selector: 'app-piantina',
  templateUrl: './piantina.component.html',
  styleUrls: ['./piantina.component.scss'],
})
export class PiantinaComponent implements OnInit {

  private piani: Array<any> = [];
  private stanze: Array<any> = [];

  public pianoSelezionato: string = '';
  public stanzaSelezionata: string = '';
  public postoSelezionato: string = '';

  // VARIABILI MAPPA SVG
  private svgNode;
  zoom = 100;

  // CALENDARIO
  private _daysConfig: DayConfig[] = [];
  private _color: string = 'primary';

  options: CalendarComponentOptions = {
    color: this._color,
    showMonthPicker: false,
    pickMode: 'multi',
    showToggleButtons: true,
    daysConfig: this._daysConfig,
  };

  constructor(private alertController: AlertController, private menu: MenuController,
    public loadingService: LoadingService, private http: HttpClient,
    public popoverCtrl: PopoverController) {
  }

  ngOnInit() {
    this.loadingService.presentLoading('Aspetta...').then(() => {
      const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/getFloors';

      this.http.get(url).subscribe(response => {
        const hasError = response['hasError'];

        if (hasError !== undefined) {
          this.presentAlert3('Attenzione', 'Si è verificato un errore. Provare a riaccedere alla pagina');
          return;
        }

        for (let i = 0; i < (response as []).length; i = i + 1) {
          this.piani.push({
            label: response[i].nome,
            type: 'radio',
            value: response[i].nome,
            checked: false
          });
        }

        this.loadingService.dismissLoading();
      });
    });
  }

  async presentAlert3(header, message) {
    const alert = await this.alertController.create({
      header: header,
      cssClass: 'alertClass3',
      message: message,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    await alert.present();
  }

  ionViewDidEnter() {

  }

  // FUNZIONE ZOOM MAPPA SVG
  public zoomIn(value, isButton) {
    if (isButton) {
      this.svgNode.style.transition = 'all 1.5s cubic-bezier(0.22, 0.61, 0.36, 1) 0s';
    } else {
      this.svgNode.style.transition = 'all 0s ease 0s';
    }
    if (this.zoom < 400) {
      this.zoom = Number((this.zoom + value).toFixed(1));
      this.svgNode.style.width = this.zoom + '%';
      this.svgNode.style.height = this.zoom + '%';
    }
    if (this.zoom >= 400) {
      this.zoom = 400;
      this.svgNode.style.width = this.zoom + '%';
      this.svgNode.style.height = this.zoom + '%';
    }
  }

  public zoomOut(value, isButton) {
    if (isButton) {
      this.svgNode.style.transition = 'all 1.5s cubic-bezier(0.22, 0.61, 0.36, 1) 0s';
    } else {
      this.svgNode.style.transition = 'all 0s ease 0s';
    }
    if (this.zoom > 100) {
      this.zoom = Number((this.zoom - value).toFixed(1));
      this.svgNode.style.width = this.zoom + '%';
      this.svgNode.style.height = this.zoom + '%';
    }
    if (this.zoom <= 100) {
      this.zoom = 100;
      this.svgNode.style.width = this.zoom + '%';
      this.svgNode.style.height = this.zoom + '%';
    }
  }

  // Swipe per il menu laterale
  handleSwipe() {
    this.menu.open();
  }

  // Pinch per l'immagine
  handlePinch(event: any): void {
    if (event.scale < 1.0) {
      this.zoomOut(event.scale * 5, false);
    } else if (event.scale > 1.0) {
      this.zoomIn(event.scale, false);
    }
  }

  async mostraPiani() {
    const alert = await this.alertController.create({
      header: 'Seleziona il piano',
      inputs: this.piani,
      cssClass: 'alertClass',
      buttons: [
        {
          text: 'Indietro',
          role: 'cancel',
          cssClass: 'alertMedium',
        }, {
          text: 'Conferma',
          handler: (res) => {
            this.stanzaSelezionata = '';

            this.pianoSelezionato = res;

            for (let i = 0; i < this.piani.length; i = i + 1) {
              if (this.piani[i]['value'] === res) {
                this.piani[i]['checked'] = true;
              } else {
                this.piani[i]['checked'] = false;
              }
            }

            // Se clicca conferma senza selezionare niente l'alert continua ad essere mostrato, 
            // così è forzato a premere sul tasto indietro
            if (this.pianoSelezionato === undefined) {
              this.pianoSelezionato = '';
              this.mostraPiani();
            }
            else {
              this.caricaStanze();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  caricaStanze() {
    this.loadingService.presentLoading('Aspetta...').then(() => {

      const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/getRooms';

      this.http.get(url + '?floor=' + this.pianoSelezionato).subscribe(response => {
        const hasError = response['hasError'];

        if (hasError !== undefined) {
          this.presentAlert3('Attenzione', 'Si è verificato un errore. Provare a riaccedere alla pagina');
          return;
        }

        this.stanze = [];

        for (let i = 0; i < (response as []).length; i = i + 1) {
          this.stanze.push({
            label: response[i].stanza,
            type: 'radio',
            value: response[i].stanza + '||' + response[i].planimetria,
            checked: false
          });
        }

        this.loadingService.dismissLoading();
      });
    });
  }

  async mostraStanze() {
    const alert = await this.alertController.create({
      header: 'Seleziona la stanza',
      inputs: this.stanze,
      cssClass: 'alertClass',
      buttons: [
        {
          text: 'Indietro',
          role: 'cancel',
          cssClass: 'alertMedium',
        }, {
          text: 'Conferma',
          handler: (res) => {
            if (res === undefined) {
              this.stanzaSelezionata = undefined;
            } else {
              this.stanzaSelezionata = res.split('||')[0];
            }

            let nomePlanimetria = '';

            for (let i = 0; i < this.stanze.length; i = i + 1) {
              if (this.stanze[i]['value'] === res) {
                this.stanze[i]['checked'] = true;

                nomePlanimetria = res.split('||')[1];
              } else {
                this.stanze[i]['checked'] = false;
              }
            }

            // Se clicca conferma senza selezionare niente l'alert continua ad essere mostrato, 
            // così è forzato a premere sul tasto indietro
            if (this.stanzaSelezionata === undefined) {
              this.stanzaSelezionata = '';
              this.mostraStanze();
            } else {
              this.caricaPlanimetria(nomePlanimetria);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  caricaPlanimetria(nomePlanimetria) {
    this.loadingService.presentLoading('Aspetta...').then(() => {

      const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/getPlanimetry';

      this.http.get(url + '?nameFile=' + nomePlanimetria).subscribe(response => {
        const hasError = response['hasError'];

        if (hasError !== undefined) {
          this.presentAlert3('Attenzione', 'Si è verificato un errore. Provare a riaccedere alla pagina');
          return;
        }

        let divSvg = document.querySelector('#oggettoSVG') as HTMLElement;
        divSvg.innerHTML = response['file'];

        this.svgNode = document.querySelector('#Linea_1') as HTMLElement;
        this.svgNode.style.width = this.zoom + '%';
        this.svgNode.style.height = this.zoom + '%';

        const hammertime = new Hammer(divSvg, {
          touchAction: 'pan-x pan-y'
        });
        hammertime.get('pinch').set({ enable: true });

        hammertime.on('pinch', (event) => {
          this.handlePinch(event);
        });


        const arrayUse = document.querySelectorAll('use');
        for (let i = 0; i < arrayUse.length; i = i + 1) {
          arrayUse[i].addEventListener('click', (e: Event) => {
            this.postoSelezionato = arrayUse[i]['id'];

            this.notifications(e);
          });
        }

        this.loadingService.dismissLoading();
      });
    });
  }

  async notifications(myEvent) {
    this.loadingService.presentLoading('Aspetta...').then(() => {
      const uid = localStorage.getItem('uid');
      const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/checkAlreadyBookedUp';

      this.http.get(url + '?uid=' + uid + '&floor=' + this.pianoSelezionato + '&room=' + this.stanzaSelezionata + '&position=' + this.postoSelezionato).toPromise().then(async (response) => {
        const hasError = response['hasError'];

        this.loadingService.dismissLoading();

        if (hasError !== undefined) {
          this.presentAlert3('Attenzione', 'Si è verificato un errore. Provare a riaccedere alla pagina');
        } else {
          const days = [];

          for (let i = 0; i < (response['giorniSW'] as []).length; i = i + 1) {
            days.push({
              date: new Date(parseInt(response['giorniSW'][i].anno), parseInt(response['giorniSW'][i].mese) - 1, parseInt(response['giorniSW'][i].giorno)),
              disable: true,
              subTitle: 'SW'
            });
          }

          for (let i = 0; i < (response['giorniOccupati'] as []).length; i = i + 1) {
            days.push({
              date: new Date(parseInt(response['giorniOccupati'][i].anno), parseInt(response['giorniOccupati'][i].mese) - 1, parseInt(response['giorniOccupati'][i].giorno)),
              disable: true,
              subTitle: 'Occupato'
            });
          }

          //pickMode: [single, multi] | posto: [null, "n° posto"]
          const popover = await this.popoverCtrl.create({
            component: NotificationsComponent,
            componentProps: { daysBlocked: days, pickMode: 'multi', posto: this.postoSelezionato, color: 'secondary' },
            event: myEvent,
            animated: true,
            translucent: true
          });

          await popover.present();

          (await popover).onDidDismiss().then((popoverData) => {
            if ((popoverData.data === undefined) || (popoverData.data.scelta === 'annulla') || (popoverData.data.date.length === 0)) {
              return;
            }

            const body = {};
            body['dates'] = [];
            body['uid'] = localStorage.getItem('uid');
            body['floor'] = this.pianoSelezionato;
            body['room'] = this.stanzaSelezionata;
            body['position'] = this.postoSelezionato;

            for (let i = 0; i < (popoverData.data.date as []).length; i = i + 1) {
              const giornoArray = (popoverData.data.date[i]._d + '').substring(0, 15).split(' ');

              let day = giornoArray[2];

              if (day[0] == '0') {
                day = day.replace('0', '');
              }

              let month = 0;
              switch (giornoArray[1]) {
                case 'Jan': month = 1; break;
                case 'Feb': month = 2; break;
                case 'Mar': month = 3; break;
                case 'Apr': month = 4; break;
                case 'May': month = 5; break;
                case 'Jun': month = 6; break;
                case 'Jul': month = 7; break;
                case 'Aug': month = 8; break;
                case 'Sep': month = 9; break;
                case 'Oct': month = 10; break;
                case 'Nov': month = 11; break;
                case 'Dec': month = 12; break;
              }
              const year = giornoArray[3];

              body['dates'].push({
                giorno: day,
                mese: month + '',
                anno: year
              });
            }

            this.loadingService.presentLoading('Aspetta...').then(() => {
              const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/bookPosition';

              this.http.post(url, JSON.stringify(body)).subscribe(response => {
                const hasError = response['hasError'];

                this.loadingService.dismissLoading();

                if (hasError === true) {
                  this.presentAlert3('Errore', 'Errore durante la prenotazione della postazione');
                } else {
                  this.presentAlert3('Successo', 'Postazione prenotata con successo');
                }
              });
            });
          });
        }
      });
    });
  }
}

import * as Hammer from 'hammerjs';

import { HttpClient } from '@angular/common/http';
import { AlertController, MenuController } from '@ionic/angular';
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

  public pianoSelezionato:string = '';
  public stanzaSelezionata:string = '';

  // VARIABILI MAPPA SVG
  private nodeZoom;
  private zoomValue = 0.4;

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
              public loadingService: LoadingService,private http: HttpClient) { }

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
  public zoomIn(value, precision) {
    if (this.zoomValue < 1.2) {
      this.zoomValue = Number((this.zoomValue + value).toFixed(precision));
      this.nodeZoom.style.zoom = this.zoomValue + '';
    }
    if (this.zoomValue >= 1.2) {
      this.zoomValue = 1.2;
      this.nodeZoom.style.zoom = this.zoomValue + '';
    }
  }

  public zoomOut(value, precision) {
    if (this.zoomValue > 0.4) {
      this.zoomValue = Number((this.zoomValue - value).toFixed(precision));
      this.nodeZoom.style.zoom = this.zoomValue + '';
    }
    if (this.zoomValue <= 0.4) {
      this.zoomValue = 0.4;
      this.nodeZoom.style.zoom = this.zoomValue + '';
    }
  }

  // Swipe per il menu laterale
  handleSwipe() {
    this.menu.open();
  }

  // Pinch per l'immagine
  handlePinch(event: any): void {
    if (event.scale < 1.0) {
      this.zoomOut(event.scale / 100, 3);
    } else if (event.scale > 1.0) {
      this.zoomIn(event.scale / 1000, 3);
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

        let node = document.querySelector('#oggettoSVG') as HTMLElement;
        node.innerHTML = response['file'];

        this.nodeZoom = document.querySelector('#Linea_1') as HTMLElement;
        this.nodeZoom.style.zoom = this.zoomValue + '';

        const arrayUse = document.querySelectorAll('use');

        for(let i = 0; i < arrayUse.length; i = i + 1) {
          arrayUse[i].addEventListener('click', (e:Event) => {
            const idPosto = arrayUse[i]['id'];

            // cliccato il bottone, apri il calendario
          })
        }

        this.loadingService.dismissLoading();
      });
    });
  }

  cliccato(id) {
    console.log(id);

    this.presentAlert3('Attenzione', 'Hai cliccato il posto ' + id);
  }

}

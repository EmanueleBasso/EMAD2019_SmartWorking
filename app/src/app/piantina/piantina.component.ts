import * as Hammer from 'hammerjs';
import { AlertController, MenuController } from '@ionic/angular';

import { Component } from '@angular/core';
import { DayConfig, CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-piantina',
  templateUrl: './piantina.component.html',
  styleUrls: ['./piantina.component.scss'],
})
export class PiantinaComponent {

  // VARIABILI MAPPA SVG
  private nodeZoom;
  private zoomValue = 0.2;

  // CALENDARIO
  private _daysConfig: DayConfig[] = [];
  private _color: string = 'primary';

  constructor(private alertController: AlertController, private menu: MenuController) {

  }

  options: CalendarComponentOptions = {
    color: this._color,
    showMonthPicker: false,
    pickMode: 'multi',
    showToggleButtons: true,
    daysConfig: this._daysConfig,
  };

  ionViewDidEnter() {
    this.nodeZoom = document.querySelector('#oggettoSVG') as HTMLElement;
    this.nodeZoom.style.zoom = this.zoomValue + '';
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

  //ALERT PER LA SCELTA DEL PIANO E DELLA STANZA
  async mostraPiano() {
    const alert = await this.alertController.create({
      header: 'Scegli il progetto!',
      inputs: [
        {
          name: 'piano1',
          type: 'radio',
          label: 'piano 1',
          value: 'p1',
          id: 'idp1',
          checked: true,
        }, {
          name: 'piano2',
          type: 'radio',
          label: 'piano 2',
          value: 'p2',
        },
        {
          name: 'piano3',
          type: 'radio',
          label: 'piano 3',
          value: 'p3'
        }
      ],
      buttons: [
        {
          text: 'Indietro',
          role: 'cancel',
          cssClass: 'secondary',

          handler: () => {
            console.log('Cancella');
          }
        }, {
          text: 'Conferma',
          handler: () => {
            console.log('Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async mostraStanza() {
    const alert = await this.alertController.create({
      header: 'Scegli il progetto!',
      inputs: [
        {
          name: 'stanza1',
          type: 'radio',
          label: 'stanza 1',
          value: 's1',
          id: 'sdp1',
          checked: true,
        }, {
          name: 'stanza2',
          type: 'radio',
          label: 'stanza 2',
          value: 's2',
        },
        {
          name: 'stanza3',
          type: 'radio',
          label: 'stanza 3',
          value: 's3'
        }
      ],
      buttons: [
        {
          text: 'Indietro',
          role: 'cancel',
          cssClass: 'secondary',

          handler: () => {
            console.log('Cancella');
          }
        }, {
          text: 'Conferma',
          handler: () => {
            console.log('Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}

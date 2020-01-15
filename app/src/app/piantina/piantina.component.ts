import { AlertController } from '@ionic/angular';

import { Component } from '@angular/core';
import { DayConfig, CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-piantina',
  templateUrl: './piantina.component.html',
  styleUrls: ['./piantina.component.scss'],
})
export class PiantinaComponent {

  private nodeZoom;
  private zoomValue;

  //CALENDARIO
  private _daysConfig: DayConfig[] = [];
  private _color: string = 'primary';

  constructor(public alertController: AlertController) {
  }

  ionViewWillEnter(){
    this.nodeZoom = document.querySelector('.oggettoSVG') as HTMLElement;
    this.zoomValue = +this.nodeZoom.style.zoom;
  }

  options: CalendarComponentOptions = {
    color: this._color,
    showMonthPicker: false,
    pickMode: 'multi',
    showToggleButtons: true,
    daysConfig: this._daysConfig,
  };

  //FUNZIONE ZOOM MAPPA
  private zoomIn() {
    if(this.zoomValue >= 1.5 ){
      //disable +
      //node['disabled'] = true;
    }
    else{
      //enable -
      this.zoomValue = this.zoomValue + 0.2;
      this.nodeZoom.style.zoom = this.zoomValue + '';
    }
  }
  private zoomOut(){
    if(this.zoomValue <= 0.3 ){
      //disable +
      //node['disabled'] = true;
    }
    else{
      //enable -
      this.zoomValue = this.zoomValue - 0.2;
      this.nodeZoom.style.zoom = this.zoomValue + '';
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

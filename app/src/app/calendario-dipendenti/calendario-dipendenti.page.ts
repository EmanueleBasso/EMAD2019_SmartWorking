import { HttpClient } from '@angular/common/http';
import { MenuController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendario-dipendenti',
  templateUrl: './calendario-dipendenti.page.html',
  styleUrls: ['./calendario-dipendenti.page.scss'],
})
export class CalendarioDipendentiPage implements OnInit {
  private progetti: Array<Object> = [];
  private progettoSelezionato: string = "";
  private items: Array<Object> = [];
  private visualizzareDipendenti: boolean = false;
  private selectedRadioGroup: any;
  public click: boolean = false;

  constructor(private menu: MenuController,
    private alertController: AlertController, private http: HttpClient) { }

  // Funzione carica lista progetti da DB
  ngOnInit() {

  }

  // Alert blocca giorno
  async alertBloccaSW(nomeUtente) {
    const alert = await this.alertController.create({
      header: 'Attenzione',
      cssClass: 'alertClass2',
      message: 'Sei sicuro di voler bloccare lo sw all\'utente ' + "\"" + nomeUtente + "\"",
      buttons: [
        {
          text: 'Indietro',
          role: 'cancel',
          cssClass: 'alertMedium',
        }, {
          text: 'Conferma',
          cssClass: 'alertConfirm',
          handler: (res) => {

          }
        }
      ]
    });
    await alert.present();
  }

  // Blocca lo SW all'utente x
  onClickBloccaSW() {
    this.alertBloccaSW("Questo utente");
  }

  // Visualizza il calendario dell'utente x
  onClickDettagliSW() {
    this.click = !this.click;
  }

  // Swipe per il menu laterale
  handleSwipe() {
    this.menu.open();
  }
}

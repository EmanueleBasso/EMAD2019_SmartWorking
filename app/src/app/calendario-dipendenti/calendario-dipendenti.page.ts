import { HttpClient } from '@angular/common/http';
import { MenuController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import LoadingService from '../providers/loading.service';

@Component({
  selector: 'app-calendario-dipendenti',
  templateUrl: './calendario-dipendenti.page.html',
  styleUrls: ['./calendario-dipendenti.page.scss'],
})
export class CalendarioDipendentiPage implements OnInit {
  private progetti: Array<any> = [];
  private progettoSelezionato: string = '';
  public nomeProgettoSelezionato: string = '';
  private items: Array<any> = [];
  public click: Array<any> = [];
  public impedisciSW: Array<any> = [];

  constructor(private menu: MenuController, private loadingService: LoadingService,
    private alertController: AlertController, private http: HttpClient) { }

  ngOnInit() {
    this.loadingService.presentLoading('Aspetta...').then(() => {

      const uid = localStorage.getItem('uid');
      const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/getProjects';

      this.http.get(url + '?uid=' + uid).subscribe(response => {
        const hasError = response['hasError'];

        if (hasError !== undefined) {
          this.presentAlert3('Errore', 'Si è verificato un errore. Provare a riaccedere alla pagina');
          return;
        }

        for (let i = 0; i < (response as []).length; i = i + 1) {
          this.progetti.push({
            label: response[i].nome,
            type: 'radio',
            value: response[i].id,
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

  // Alert blocca giorno
  async alertBloccaSW(nomeUtente, uidDipendente, number) {
    const alert = await this.alertController.create({
      header: 'Attenzione',
      cssClass: 'alertClass2',
      message: 'Sei sicuro di voler bloccare lo Smart Working all\'utente ' + '"' + nomeUtente + '" per il mese successivo?',
      buttons: [
        {
          text: 'Indietro',
          role: 'cancel',
          cssClass: 'alertMedium',
        }, {
          text: 'Conferma',
          cssClass: 'alertConfirm',
          handler: (res) => {
            this.loadingService.presentLoading('Aspetta...').then(() => {

              const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/blockSW';

              this.http.get(url + '?uid=' + uidDipendente).subscribe(response => {
                const hasError = response['hasError'];

                this.loadingService.dismissLoading();

                if (hasError === true) {
                  this.presentAlert3('Errore', 'Si è verificato un errore. Provare a riaccedere alla pagina');
                } else {
                  this.impedisciSW[number] = true;

                  this.presentAlertBloccatoCorrettamente();
                  
                  this.caricaDipendenti();
                }
              });
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertBloccatoCorrettamente() {
    const alert = await this.alertController.create({
      header: 'Successo',
      cssClass: 'alertClass4',
      message: 'Dipendente bloccato con successo',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alertConfirm',
        }
      ]
    });

    await alert.present();
  }

  async mostraProgetti() {
    const alert = await this.alertController.create({
      header: 'Seleziona il progetto',
      inputs: this.progetti,
      cssClass: 'alertClass',
      buttons: [
        {
          text: 'Indietro',
          role: 'cancel',
          cssClass: 'alertMedium',
        }, {
          text: 'Conferma',
          cssClass: 'alertConfirm',
          handler: (res) => {
            this.progettoSelezionato = res;

            for (let i = 0; i < this.progetti.length; i = i + 1) {
              if (this.progetti[i]['value'] === res) {
                this.nomeProgettoSelezionato = this.progetti[i]['label'];

                this.progetti[i]['checked'] = true;
              } else {
                this.progetti[i]['checked'] = false;
              }
            }

            // Se clicca conferma senza selezionare niente l'alert continua ad essere mostrato, 
            // così è forzato a premere sul tasto indietro
            if (this.progettoSelezionato === undefined) {
              this.progettoSelezionato = '';
              this.mostraProgetti();
            }
            else {
              this.caricaDipendenti();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  caricaDipendenti() {
    this.loadingService.presentLoading('Aspetta...').then(() => {

      const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/getAssignedUsers';

      this.http.get(url + '?project=' + this.progettoSelezionato).subscribe(response => {
        const hasError = response['hasError'];

        if (hasError !== undefined) {
          this.presentAlert3('Errore', 'Si è verificato un errore. Provare a riaccedere alla pagina');
          return;
        }

        this.items = [];
        this.click = [];
        this.impedisciSW = [];

        for (let i = 0; i < (response as []).length; i = i + 1) {
          let dates = [];

          for (let j = 0; j < (response[i].calendario as []).length; j = j + 1) {
            let data = '';

            if (response[i].calendario[j].giorno.length === 1) {
              data += '0';
            }

            data += response[i].calendario[j].giorno + '/';

            if (response[i].calendario[j].mese.length === 1) {
              data += '0';
            }

            data += response[i].calendario[j].mese + '/' + response[i].calendario[j].anno;

            dates.push(data);
          }

          this.items.push({
            number: i + 1,
            nome: response[i].nome,
            cognome: response[i].cognome,
            uid: response[i].uid,
            dates: dates
          });

          this.click.push(false);

          this.impedisciSW.push(response[i].meseSuccessivoBloccato);
        }

        this.loadingService.dismissLoading();
      });
    });
  }

  // Blocca lo SW all'utente x
  onClickBloccaSW(uidDipendente, nome, cognome, number) {
    this.alertBloccaSW(nome + ' ' + cognome, uidDipendente, number);
  }

  // Visualizza il calendario dell'utente number
  onClickDettagliSW(number) {
    this.click[number] = !this.click[number];
  }

  // Swipe per il menu laterale
  handleSwipe() {
    this.menu.open();
  }
}

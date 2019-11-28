import { NotificationsComponent } from './../notifications/notifications.component';
import { AlertController, PopoverController, LoadingController, Events } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progetti',
  templateUrl: './progetti.page.html',
  styleUrls: ['./progetti.page.scss'],
})
export class ProgettiPage implements OnInit{
  private loading: any;
  private progetti: Array<Object> = [];
  private progettoSelezionato: string = "";
  public items: Array<Object> = [];
  public visualizzareDipendenti: boolean = false;
  public giorno: string;

  constructor(public popoverCtrl: PopoverController, public alertController: AlertController,
              public http: HttpClient, public loadingController: LoadingController, private events: Events) { }

  ngOnInit() {
    this.presentLoadingWithOptions();

    const uid = localStorage.getItem('uid');
    const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/getProjects';

    this.http.get(url + '?uid=' + uid).subscribe(response => {

      const hasError = response['hasError'];

      if (hasError !== undefined) {
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

      this.loading.dismiss();
    });

    this.events.subscribe('data_changed', (giorno, mese, anno) => {
      if (this.progettoSelezionato.length === 0) {
        return;
      }

      this.presentLoadingWithOptions();
      const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/checkWhoInSW';

      this.http.get(url + '?project=' + this.progettoSelezionato + '&day=' + giorno + '&month=' + mese + '&year=' + anno)
      .subscribe(response => {

        const hasError = response['hasError'];

        if (hasError !== undefined) {
          return;
        }

        this.giorno = giorno + '/' + mese + '/' + anno;
        this.items = [];
        for (let i = 0; i < (response as []).length; i = i + 1) {
          this.items.push({
            title: response[i].nome + ' ' + response[i].cognome
          });
        }

        if (this.items.length === 0) {
          this.visualizzareDipendenti = false;
        } else {
          this.visualizzareDipendenti = true;
        }

        this.loading.dismiss();
      });
    });
  }

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Aspetta...',
      translucent: true,
      cssClass: 'secondary',
    });
    return await this.loading.present();
  }

  async mostraProgetti() {
    const alert = await this.alertController.create({
      header: 'Seleziona il progetto',
      inputs: this.progetti,
      buttons: [
        {
          text: 'Indietro',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Conferma',
          handler: (res) => {
            this.progettoSelezionato = res;

            for (let i = 0; i < this.progetti.length; i = i + 1) {
              if (this.progetti[i]['value'] === res) {
                this.progetti[i]['checked'] = true;
              } else {
                this.progetti[i]['checked'] = false;
              }
            }

            const node = document.querySelector('#btnBloccaGiorno') as HTMLElement;
            node['disabled'] = false;
          }
        }
      ]
    });

    await alert.present();
  }

  async notifications(myEvent) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: myEvent,
      animated: true,
      translucent: true
    });

    await popover.present();

    (await popover).onDidDismiss().then((popoverData) => {
      console.log("Sono in progetto ... hai cliccato: " + popoverData.data.scelta + " " + popoverData.data.giorno);
      console.log("ha cliccato fuori dall'alert");
    });
  }
}

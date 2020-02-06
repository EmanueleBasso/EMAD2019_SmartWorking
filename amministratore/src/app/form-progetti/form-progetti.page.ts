import { Component, OnInit } from '@angular/core';
import LoadingService from '../providers/loading.service';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-form-progetti',
  templateUrl: './form-progetti.page.html',
  styleUrls: ['./form-progetti.page.scss'],
})
export class FormProgettiPage implements OnInit {

  public list = [];
  manager = '';

  constructor(private http: HttpClient, private loadingService: LoadingService, private alertController: AlertController) {
    this.list.push();
  }

  async presentAlertError(message: string) {
    const alert = await this.alertController.create({
      header: 'Errore',
      message,
      cssClass: 'alertClass2',
      buttons: [{
        text: 'OK',
      }]
    });

    await alert.present();
  }

  async presentAlertSuccessInsert() {
    const alert = await this.alertController.create({
      header: 'Successo',
      message: 'Progetto inserito con successo!',
      cssClass: 'alertClass2',
      buttons: [{
        text: 'OK',
      }]
    });

    await alert.present();
  }

  ngOnInit() {
    const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/getManagers';

    this.http.get(url).subscribe(response => {

      if (response['hasError']) {

        this.presentAlertError(response['error']);

      } else {

        this.list = response['managers'];

      }

    });
  }

  onChange(event) {

    this.manager = event.target.value;

  }

  onSubmit(form: NgForm) {

    const name = form.value.name;
    const description = form.value.description;

    if (!name) {
      this.presentAlertError('Inserire un nome per il progetto');
      return;
    }

    if (!description) {
      this.presentAlertError('Inserire una descrizione per il progetto');
      return;
    }

    if (!this.manager) {
      this.presentAlertError('Scegliere un manager per il progetto');
      return;
    }

    this.loadingService.presentLoading('Loading...').then(() => {
      const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/insertProject';

      this.http.get(url + '?name=' + name + '&description=' + description + '&manager=' + this.manager)
      .subscribe(response => {

        if (response['hasError']) {

          this.loadingService.dismissLoading();

          this.presentAlertError(response['error']);

        } else {

          this.loadingService.dismissLoading();

          this.presentAlertSuccessInsert();

        }

      });

    });

    // this.navCtrl.navigateRoot('/progetti');


  }


}

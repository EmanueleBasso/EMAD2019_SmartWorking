import { Component, OnInit } from '@angular/core';
import LoadingService from '../providers/loading.service';
import { NgForm } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-form-dipendenti',
  templateUrl: './form-dipendenti.page.html',
  styleUrls: ['./form-dipendenti.page.scss'],
})
export class FormDipendentiPage implements OnInit {
  ngOnInit() {
  }

  constructor(private loadingService: LoadingService, private alertController: AlertController, private navCtrl: NavController,
    private http: HttpClient) { }

  async presentAlertUnknown() {
    const alert = await this.alertController.create({
      header: 'Credenziali non valide',
      message: 'Inserire credenziali valide',
      cssClass: 'alertClass2',
      buttons: [{
        text: 'OK',
      }]
    });
    await alert.present();
  }

  async presentAlertEmail() {
    const alert = await this.alertController.create({
      header: 'Credenziali non valide',
      message: 'Inserire email correttamente',
      cssClass: 'alertClass2',
      buttons: [{
        text: 'OK',
      }]
    });
    await alert.present();
  }

  async presentAlertNameError() {
    const alert = await this.alertController.create({
      header: 'Credenziali non valide',
      message: 'Inserire nome e cognome correttamente',
      cssClass: 'alertClass2',
      buttons: [{
        text: 'OK',
      }]
    });
    await alert.present();
  }

  async presentAlertInsertError(message: string) {
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
      message: 'Dipendente inserito con successo!',
      cssClass: 'alertClass4',
      buttons: [{
        text: 'OK',
      }]
    });

    await alert.present();
  }

  onSubmit(form: NgForm) {

      const name = form.value.name;
      const surname = form.value.surname;
      const email = form.value.email;
      const regexEmail = new RegExp('^([a-zA-Z0-9\.]+)@capgemini.com$');
      const manager = form.value.manager;

      if ( !email || !name || !surname ) {
        // credenziali non inseriti
        this.presentAlertUnknown();
        return;
      }

      // controllo che sono stringhe
      if (parseFloat(name) || parseFloat(surname)) {
          this.presentAlertNameError();
          return;
      }

      // aggiungo automaticamente la parte destra della email
      if (!(regexEmail.test(email))) {
        this.presentAlertEmail();
        return;
      }

      if (manager === 'false' || manager === false) {
        console.log('dip');
        // dipendente
      } else {
        // manager
        console.log('man');
      }

      this.loadingService.presentLoading('Loading...').then(() => {
        const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/insertEmployee';

        this.http.get(url + '?name=' + name + '&surname=' + surname + '&email=' + email + '&manager=' + manager )
        .subscribe(response => {

          if (response['hasError']) {

            this.loadingService.dismissLoading();

            this.presentAlertInsertError(response['error']);

          } else {

            this.loadingService.dismissLoading();

            this.presentAlertSuccessInsert();

            this.navCtrl.navigateRoot('/dipendenti');
          }

        })

      });

  }

}

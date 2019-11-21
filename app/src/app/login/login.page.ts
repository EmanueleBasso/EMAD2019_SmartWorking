import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import AuthService from '../providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  enteredEmail: string;
  enteredPassword: string;
  private loading: any;

  constructor(public loadingController: LoadingController, public alertController: AlertController,
              private authService: AuthService, private navCtrl: NavController) { }

  async presentAlertUnknown() {
    const alert = await this.alertController.create({
      header: 'Credenziali non valide!',
      message: 'Inserire credenziali valide',
      buttons: [{
        text: 'OK',
        }
      ]
    });
    await alert.present();
  }

  async presentAlertError() {
    const alert = await this.alertController.create({
      header: 'Autenticazione non riuscita!',
      message: 'Credenziali non corrette',
      buttons: [{
        text: 'OK'
        }
      ]
    });

    await alert.present();
  }

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Aspetta...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }

  onClickLogin() {
    //this.enteredEmail = 'prova@capgemini.com';
    //this.enteredPassword = 'prova1';

    if (!this.enteredPassword || !this.enteredEmail) {
      // email o password non inserita
      this.presentAlertUnknown();
      return;
    }

    if (!this.enteredEmail.includes('@')) {
      // facciamo che lo aggiunge automaticamente se non c'è
      this.enteredEmail = this.enteredEmail.concat('@capgemini.com');
    }

    if (this.enteredEmail.includes('@capgemini.com') && !this.enteredEmail.startsWith('@')) {
      // è tutto apposto
      this.presentLoadingWithOptions();

      this.authService.login(this.enteredEmail, this.enteredPassword).then((logged) => {
        this.loading.dismiss();

        if (logged === true) {
          this.navCtrl.navigateRoot('/home');
        } else {
          this.presentAlertError();
        }
      });
    } else {
      // errore! non è una mail valida
      this.presentAlertUnknown();
    }
  }
}

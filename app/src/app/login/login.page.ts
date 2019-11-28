import { Component } from '@angular/core';
import { LoadingController, NavController, IonInput, MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import AuthService from '../providers/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  private loading: any;

  constructor(public loadingController: LoadingController, public alertController: AlertController,
    private authService: AuthService, private navCtrl: NavController, private menu: MenuController) {
    menu.enable(false);
  }

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
      message: 'Login...',
      translucent: true,
      cssClass: 'secondary',
    });
    return await this.loading.present();
  }

  // dovrebbe essere questa la versione corretta di fare la login
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    else {
      const email = form.value.email;
      const password = form.value.password;
      let yourEmail: string = '';
      console.log(email, password);

      // this.enteredEmail = 'prova@capgemini.com';
      // this.enteredPassword = 'prova1';

      if (!password || !email) {
        // email o password non inserita
        this.presentAlertUnknown();
        return;
      }

      // aggiungo automaticamente la parte destra della email
      if (!email.includes('@')) {
        // facciamo che lo aggiunge automaticamente se non c'è
        yourEmail = email.concat('@capgemini.com');
      }

      // è tutto apposto
      if ((email.includes('@capgemini.com') || yourEmail.includes('@capgemini.com')) && !email.startsWith('@')) {
        // questo comando serve per non far vedere l'aggiunta di '@capgemini.com' nell'input
        if (yourEmail.length === 0) {
          yourEmail = email;
        }
        this.presentLoadingWithOptions();

        this.authService.login(yourEmail, password).then((logged) => {
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

  // non sapete quanto ci ho messo per fare questa cosa
  focusOnPassword(passwordInput: IonInput) {
    passwordInput.setFocus();
  }
}

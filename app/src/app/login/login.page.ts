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

  constructor(private loadingController: LoadingController, private alertController: AlertController,
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

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    else {
      const email = form.value.email;
      const password = form.value.password;
      let yourEmail: string = '';
      console.log(email, password);

      if (!password || !email) {
        // email o password non inserita
        this.presentAlertUnknown();
        return;
      }

      // aggiungo automaticamente la parte destra della email
      if (!email.includes('@')) {
        yourEmail = email.concat('@capgemini.com');
      }

      // è tutto apposto
      if ((email.includes('@capgemini.com') || yourEmail.includes('@capgemini.com')) && !email.startsWith('@')) {
        // questo comando serve per non far vedere l'aggiunta di '@capgemini.com' nell'input
        if (yourEmail.length === 0) {
          yourEmail = email;
        }
        this.presentLoadingWithOptions().then(() => {

          this.authService.login(yourEmail, password).then((logged) => {
            this.loading.dismiss();

            if (logged === true) {
              this.navCtrl.navigateRoot('/home');
            } else {
              this.presentAlertError();
            }
          });
        });
      } else {
        // non è una mail valida
        this.presentAlertUnknown();
      }
    }
  }

  focusOnPassword(passwordInput: IonInput) {
    passwordInput.setFocus();
  }
}

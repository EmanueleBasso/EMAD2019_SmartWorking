import { Component, OnInit } from '@angular/core';
import LoadingService from '../providers/loading.service';
import { NgForm } from '@angular/forms';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { isString, isNumber } from 'util';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-progetti',
  templateUrl: './form-progetti.page.html',
  styleUrls: ['./form-progetti.page.scss'],
})
export class FormProgettiPage implements OnInit {
  names: string[];
  inserisci = true;
  associa = false;

  constructor(private loadingService: LoadingService, private alertController: AlertController, private navCtrl: NavController, private route: ActivatedRoute) {
    this.names = ['Dipendente1', 'Dipendente2', 'Dipendente3'];
  }



  async presentAlertUnknown() {
    const alert = await this.alertController.create({
      header: 'Credenziali non valide!',
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
      header: 'Credenziali non valide!',
      message: 'Inserire email menager correttamente',
      cssClass: 'alertClass2',
      buttons: [{
        text: 'OK',
      }]
    });
    await alert.present();
  }

  ngOnInit() {
    /*let data = this.navPar.get('data');
    if (data != undefined) {
      this.inserisci = (/true/i).test(data);
    }*/
  }

  onSubmit(form: NgForm) {
    let manager1: string = "";
    const scope = form.value.scope;
    const description = form.value.description;
    const manager = form.value.manager;
    const state = form.value.state;
    console.log(scope, description, manager, state);


    if (!scope || !description || !manager) {
      // email o password non inserita
      this.presentAlertUnknown();
      return;
    }

    if (state === 'false' || state === false) {
      console.log('non attivo');
      // progetto attivo
    } else {
      // progetto chiuso
      console.log('attivo');
    }

    if (!manager.includes('@')) {
      manager1 = manager.concat('@capgemini.com');
    }
    console.log(manager1);

    if (!(manager.includes('@capgemini.com') || manager1.includes('@capgemini.com')) && !manager.startsWith('@')) {

      this.presentAlertEmail();
    }

    if (parseFloat(manager.charAt(0))) {
      this.presentAlertEmail();
    }

    console.log(state);

    this.loadingService.presentLoading('Loading...').then(() => {


      this.loadingService.dismissLoading();
      this.associa = true;

    });

    // this.navCtrl.navigateRoot('/progetti');


  }


}

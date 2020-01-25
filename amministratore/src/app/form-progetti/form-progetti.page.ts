import { Component, OnInit } from '@angular/core';
import LoadingService from '../providers/loading.service';
import { NgForm } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { isString, isNumber } from 'util';

@Component({
  selector: 'app-form-progetti',
  templateUrl: './form-progetti.page.html',
  styleUrls: ['./form-progetti.page.scss'],
})
export class FormProgettiPage implements OnInit {

  constructor(private loadingService: LoadingService, private alertController: AlertController, private navCtrl: NavController) { }


  
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
  }

  onSubmit(form: NgForm) {
    let manager1: string ="";
    const scope= form.value.scope;
    const description= form.value.description;
    const manager= form.value.manager;
    const state= form.value.state;
    console.log(scope,description,manager,state);
     
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
  
    if(parseFloat(manager.charAt(0))) {
    this.presentAlertEmail();
  }

    console.log(state );

   
    this.navCtrl.navigateRoot('/progetti');
    

  }


}

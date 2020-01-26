import { Component, OnInit } from '@angular/core';
import LoadingService from '../providers/loading.service';
import { NgForm } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { isString, isNumber } from 'util';


@Component({
  selector: 'app-form-dipendenti',
  templateUrl: './form-dipendenti.page.html',
  styleUrls: ['./form-dipendenti.page.scss'],
})
export class FormDipendentiPage implements OnInit {
  ngOnInit() {
  }
  
  constructor(private loadingService: LoadingService,private alertController: AlertController, private navCtrl: NavController) { }
  
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
      header: 'Credenziali non valide!',
      message: 'Inserire nome e cognome correttamente',
      cssClass: 'alertClass2',
      buttons: [{
        text: 'OK',
      }]
    });
    await alert.present();
  }

  async presentAlertPassError() {
    const alert = await this.alertController.create({
      header: 'Credenziali non valide!',
      message: 'Inserire password con massimo 8 caratteri',
      cssClass: 'alertClass2',
      buttons: [{
        text: 'OK',
      }]
    });
    await alert.present();
  }

  onSubmit(form: NgForm) {

      
      let yourEmail: string = '';
      const name= form.value.name;
      const surname= form.value.surname;
      const email = form.value.email;
      const password = form.value.password;
      const manager = form.value.manager;

      
      if (!password || !email || !name || !surname ) {
        // email o password non inserita
        this.presentAlertUnknown();
        return;
      }

      console.log(name, surname, email, password, manager );
      console.log(name.length );

      //controllo che non superi size 8 
      if(password.length >8 ){
        this.presentAlertPassError();
        return;
       }

      //controllo che sono stringhe
      if(parseFloat(name) || parseFloat(surname)){
          this.presentAlertNameError();
          return;
         }


        // aggiungo automaticamente la parte destra della email
      if (!email.includes('@')) {
            yourEmail = email.concat('@capgemini.com');
          }
        console.log(yourEmail);

      if (!(email.includes('@capgemini.com') || yourEmail.includes('@capgemini.com')) && !email.startsWith('@')) {
          
          this.presentAlertEmail();
        }
        
      if(parseFloat(email.charAt(0))) {
          this.presentAlertEmail();
        }
      
       
      if (manager === 'false' || manager === false) {
        console.log('dip');
        // dipendente
      } else {
        // manager
        console.log('man');
      }

      console.log(manager );

      this.loadingService.presentLoading('Loading...').then(() => {

      
        this.loadingService.dismissLoading();

        if (true) {
          this.navCtrl.navigateRoot('/home');
        } else {
          this.presentAlertUnknown();
        };
    });

     // this.navCtrl.navigateRoot('/dipendenti');
   
  }
  
  

}

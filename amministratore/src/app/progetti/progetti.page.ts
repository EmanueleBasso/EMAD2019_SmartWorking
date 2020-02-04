import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-progetti',
  templateUrl: './progetti.page.html',
  styleUrls: ['./progetti.page.scss'],
})

export class ProgettiPage {
  names: string[];

  goAnOtherPage() {
  
    this.navCtrl.navigateRoot('/form-progetti');
  }
  goGestioneProgetto(){
    this.navCtrl.navigateRoot('/associa-dipendenti');
  }


  constructor(public navCtrl: NavController) {
    this.names = ['Progetto1', 'Progetto2', 'Progetto3'];
  }
}

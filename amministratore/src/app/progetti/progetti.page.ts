import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-progetti',
  templateUrl: './progetti.page.html',
  styleUrls: ['./progetti.page.scss'],
})

export class ProgettiPage {
  names: string[];

  goAnOtherPage(whatClicked) {
    /*this.navPar.data = ['data', whatClicked];*/
    this.navCtrl.navigateRoot('/form-progetti');
  }


  constructor(public navCtrl: NavController, /*public navPar: NavParams*/) {
    this.names = ['Progetto1', 'Progetto2', 'Progetto3'];
  }
}

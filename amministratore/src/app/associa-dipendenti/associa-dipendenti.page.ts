import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-associa-dipendenti',
  templateUrl: './associa-dipendenti.page.html',
  styleUrls: ['./associa-dipendenti.page.scss'],
})
export class AssociaDipendentiPage implements OnInit {
  names: string[];
  constructor(  private navCtrl: NavController) { 
    this.names = ['Dipendente1', 'Dipendente2', 'Dipendente3'];
  }

  ngOnInit() {
  }

}

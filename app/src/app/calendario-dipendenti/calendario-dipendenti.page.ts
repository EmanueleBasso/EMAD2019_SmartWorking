import { HttpClient } from '@angular/common/http';
import { LoadingController, MenuController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendario-dipendenti',
  templateUrl: './calendario-dipendenti.page.html',
  styleUrls: ['./calendario-dipendenti.page.scss'],
})
export class CalendarioDipendentiPage implements OnInit {
  private loading: any;
  private progetti: Array<Object> = [];
  private progettoSelezionato: string = "";
  private items: Array<Object> = [];
  private visualizzareDipendenti: boolean = false;
  private selectedRadioGroup:any;

  constructor(public loadingController: LoadingController, private menu: MenuController,
    private alertController: AlertController, private http: HttpClient) { }

  // Funzione carica lista progetti da DB
  ngOnInit() {

  }

  // Radio Button event
  radioGroupChange(event) {
    console.log("radioGroupChange", event.detail);
    this.selectedRadioGroup = event.detail;
  }

  // Swipe per il menu laterale
  handleSwipe() {
    this.menu.open();
  }
}

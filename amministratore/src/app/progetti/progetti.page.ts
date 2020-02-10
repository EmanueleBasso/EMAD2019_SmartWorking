import { Component, OnInit } from '@angular/core';
import LoadingService from '../providers/loading.service';
import { NavController } from '@ionic/angular';
import {NavigationExtras} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-progetti',
  templateUrl: './progetti.page.html',
  styleUrls: ['./progetti.page.scss'],
})

export class ProgettiPage implements OnInit {
  public projects = [];
  public goalList =[];

  constructor(private http: HttpClient, private loadingService: LoadingService, 
    private alertController: AlertController, public navCtrl: NavController) {}

  ngOnInit() {
    this.loadingService.presentLoading('Loading...').then(() => {

      const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/getAllProjects';

      this.http.get(url).subscribe(response => {

        if (response['hasError']) {

          this.loadingService.dismissLoading();

          this.presentAlertError(response['error']);

        } else {

          this.loadingService.dismissLoading();

          this.projects = response['progetti'];

          this.goalList = this.projects;


        }

      });

    });

  }

  async presentAlertError(message: string) {
    const alert = await this.alertController.create({
      header: 'Errore',
      message,
      cssClass: 'alertClass2',
      buttons: [{
        text: 'OK',
      }]
    });

    await alert.present();
  }

  goAnOtherPage() {
    
    this.navCtrl.navigateRoot('/form-progetti');

  }

  goGestioneProgetto(id: string, nome: string, descrizione: string) {

    let navigationExtras: NavigationExtras = {

      queryParams: {

        id,
        nome,
        descrizione,

      }

    }

    this.navCtrl.navigateForward('/associa-dipendenti', navigationExtras);

  }

  filterList(evt: any) {

    const searchTerm = evt.srcElement.value;

    this.goalList = this.projects.filter(element => {
  
      return element.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1

    })

  }

}

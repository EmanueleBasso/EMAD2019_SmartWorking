import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';
import LoadingService from '../providers/loading.service';

@Component({
  selector: 'app-dipendenti',
  templateUrl: './dipendenti.page.html',
  styleUrls: ['./dipendenti.page.scss'],
})

export class DipendentiPage implements OnInit {

  constructor(public navCtrl: NavController, private alertController: AlertController, 
    private http: HttpClient, private loadingService: LoadingService) {}

  public employees = [];
  public goalList = [];

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

    this.navCtrl.navigateRoot('/form-dipendenti');

  }

  ngOnInit() { 
    this.loadingService.presentLoading('Loading...').then(() => {

      const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/getAllEmployees';

      this.http.get(url).subscribe(response => {

        if (response['hasError']) {

          this.loadingService.dismissLoading();

          this.presentAlertError(response['error']);

        } else {

          this.loadingService.dismissLoading();

          this.employees = response['dipendenti'];
          
          this.goalList = this.employees;
       


        }

      });

    });
  }

  filterList(evt: any) {

    const searchTerm = evt.srcElement.value;

    this.goalList = this.employees.filter(element => {
  
      return element.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1

    })

  }

}

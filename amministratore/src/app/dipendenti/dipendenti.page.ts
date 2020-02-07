import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';
import LoadingService from '../providers/loading.service';
import { currentId } from 'async_hooks';
import { element } from 'protractor';



@Component({
  selector: 'app-dipendenti',
  templateUrl: './dipendenti.page.html',
  styleUrls: ['./dipendenti.page.scss'],
})

export class DipendentiPage implements OnInit {

  constructor(public navCtrl: NavController, private alertController: AlertController, 
    private http: HttpClient, private loadingService: LoadingService) {}

  public employees: string[];
  public goalList: string[];

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


        }

      });

    });
  }

  initializeItem(): void {
    this.goalList = this.employees;
   
  }
  filterList(evt) {
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }
    this.employees = this.employees.filter(element =>{
      if (element.nome.toLowerCase && searchTerm){
        if (element.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
           return true;
        }
      }
      return false;
    })
  }


}

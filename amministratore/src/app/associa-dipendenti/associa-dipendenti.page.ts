import { Component, OnInit } from '@angular/core';
import LoadingService from '../providers/loading.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-associa-dipendenti',
  templateUrl: './associa-dipendenti.page.html',
  styleUrls: ['./associa-dipendenti.page.scss'],
})

export class AssociaDipendentiPage implements OnInit {

  public associated = [];
  public nonAssociated = [];
  public id = '';

  constructor(private route: ActivatedRoute, private loadingService: LoadingService, private alertController: AlertController, private navCtrl: NavController,
    private http: HttpClient) { }

  async presentAlertInsertError(message: string) {
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

  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      this.id = params.id;
      

    })

    this.loadingService.presentLoading('Loading...').then(() => {
      const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/getAssociatedUsers';

      console.log('PROGETTO: ' + this.id);

      this.http.get(url + '?project=' + this.id)

      .subscribe(response => {

        if (response['hasError']) {

          this.loadingService.dismissLoading();

          this.presentAlertInsertError(response['error']);

        } else {

          this.loadingService.dismissLoading();

          this.nonAssociated = response['daAssociare'];

          this.associated = response['associati'];

          // this.presentAlertSuccessInsert();

        }

      })

    });

  }

}

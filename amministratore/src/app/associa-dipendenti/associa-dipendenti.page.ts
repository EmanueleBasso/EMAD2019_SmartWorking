import { Component, OnInit } from '@angular/core';
import LoadingService from '../providers/loading.service';
import { NavController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-associa-dipendenti',
  templateUrl: './associa-dipendenti.page.html',
  styleUrls: ['./associa-dipendenti.page.scss'],
})

export class AssociaDipendentiPage implements OnInit {

  public associated = [];
  public nonAssociated = [];
  public goalList = [];
  public id = '';
  public nome='';
  public descrizione='';
  public manager='';

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

  async presentAlertSuccessInsert() {
    const alert = await this.alertController.create({
      header: 'Successo',
      message: 'Dipendenti associati con successo!',
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
      this.nome=params.nome;
      this.descrizione=params.descrizione;
      this.manager=params.manager;

      console.log("vediamo : "+ this.nome);
      

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

          this.goalList = this.nonAssociated;

        }

      })

    });

  }

  filterList(evt: any) {

    const searchTerm = evt.srcElement.value;

    this.goalList = this.nonAssociated.filter(element => {
  
      return element.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1

    })

  }

  onSubmit(form: NgForm) {

    let allUnchecked = true;
    let dipendentiDaAssociare = [];

    for(let p in form.value) {

      if((form.value[p] != null) && (form.value[p] == true)) {

        dipendentiDaAssociare.push(p);
        allUnchecked = false;
        
      }
    }

    if(allUnchecked) {

      this.presentAlertInsertError("Non hai selezionato nessun dipendente.");

      return;
    }

    this.loadingService.presentLoading('Loading...').then(() => {
      const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/associateEmployees';

      this.http.get(url + '?lista=' + dipendentiDaAssociare + '&progetto=' + this.id )
      .subscribe(response => {

        if (response['hasError']) {

          this.loadingService.dismissLoading();

          this.presentAlertInsertError(response['error']);

        } else {
          for(let i = 0; i < this.nonAssociated.length; i = i + 1) {

            for(let j = 0; j < dipendentiDaAssociare.length; j = j +1) {

              if(this.nonAssociated[i]['id'] === dipendentiDaAssociare[j]) {
                const item = this.nonAssociated.splice(i, 1);
      
                this.associated.push(item[0]);
      
                i = i - 1
                
                break;
              }
            }
          }

          this.loadingService.dismissLoading();

          this.presentAlertSuccessInsert();

        }

      })

    });

  }

}

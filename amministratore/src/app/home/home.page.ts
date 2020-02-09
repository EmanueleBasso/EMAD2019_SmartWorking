import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import LoadingService from '../providers/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements  OnInit{

  constructor(private loadingService: LoadingService, private http: HttpClient ) {}

  public allEmployees = 0;
  public todaySmartWorkers = 0;
  public inCompany = 0;

  ngOnInit() {

    this.loadingService.presentLoading('Loading...').then(() => {

      const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/adminHome';

        this.http.get(url).subscribe(response => {

          this.allEmployees = response['totale'];
          this.todaySmartWorkers = response['sw'];
          this.inCompany = response['inAzienda'];

          this.loadingService.dismissLoading();

        })

    })

  }

}

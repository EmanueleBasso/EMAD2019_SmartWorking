import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import LoadingService from '../providers/loading.service';

import{Chart}from 'chart.js';


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
  public dataset = [];

  ngOnInit() {


    this.loadingService.presentLoading('Loading...').then(() => {

      const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/adminHome';

        this.http.get(url).subscribe(response => {

            this.allEmployees = response['totale'];

            this.todaySmartWorkers = response['sw'];

            this.inCompany = response['inAzienda'];

            this.loadingService.dismissLoading();
            this.ShowChart();

        })
       
    })

 

  }
  ShowChart() {
  
    console.log("numeri", this.allEmployees, this.inCompany);
    
    
    const ctx= document.getElementById("myLineChart");
    Chart.defaults.scale.ticks.beginAtZero = true;

    let barChart = new Chart(ctx,{
      type: 'doughnut',
      data: {
        labels:['Dip_SW','Dip_Sede'],
        datasets:[
        {
          labels:'Points',
          backgroundColor:['#f1c40f','#32a852'],
          data: [this.todaySmartWorkers, this.inCompany]
        }
      ]
      }
    });
    
  }

}

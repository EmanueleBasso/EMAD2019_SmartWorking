import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dipendenti',
  templateUrl: './dipendenti.page.html',
  styleUrls: ['./dipendenti.page.scss'],
})
export class DipendentiPage implements OnInit {
  names:string[];
  navController: any;

  constructor() {
    this.names=['Dipendente1','Dipendente2','Dipendente3'];
    
    }

  ngOnInit() {
  }

}

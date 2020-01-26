import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';






@Component({
  selector: 'app-dipendenti',
  templateUrl: './dipendenti.page.html',
  styleUrls: ['./dipendenti.page.scss'],
})
export class DipendentiPage implements OnInit {
  names:string[];
  

  
  goAnOtherPage(){
    
    this.navCtrl.navigateRoot('/form-dipendenti');
  }

  constructor(public navCtrl: NavController) {
    
    this.names=['Dipendente1','Dipendente2','Dipendente3'];
    
    }

  ngOnInit() {
  }

}

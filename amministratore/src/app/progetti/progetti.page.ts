import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-progetti',
  templateUrl: './progetti.page.html',
  styleUrls: ['./progetti.page.scss'],
})

export class ProgettiPage implements OnInit {
  names:string[];
  navController: any;
 
  goAnOtherPage(){
    this.navCtrl.navigateRoot('/form-progetti');
  }
  
  
  constructor(public navCtrl: NavController) {
    this.names=['Progetto1','Progetto2','Progetto3'];
    
    }

    

  ngOnInit() {
  }

}

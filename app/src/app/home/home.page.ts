import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  private selectedItem: any;
  private icons = ['home', 'desktop'];
  public items: Array<{ title: string; icon: string, note: string; }> = [];
  private giorni: string[];
  private num: number;
  click: boolean = false;

  constructor() {
    this.giorni = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'];
    for (let i = 0; i < 5; i++) {
      this.num = Math.floor(Math.random() * this.icons.length);
      this.items.push({
        title: this.giorni[i],
        icon: this.icons[this.num],
        note: ((this.num == 1) ? ('Posto ' + i + ' Stanza ' + (i + i) + ' Piano ' + (i + 1)) : '')
      });
    }
  }

  itemClick(){
    this.click = !this.click;
  }
}

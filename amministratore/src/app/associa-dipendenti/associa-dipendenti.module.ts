import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssociaDipendentiPageRoutingModule } from './associa-dipendenti-routing.module';

import { AssociaDipendentiPage } from './associa-dipendenti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssociaDipendentiPageRoutingModule
  ],
  declarations: [AssociaDipendentiPage]
})
export class AssociaDipendentiPageModule {}

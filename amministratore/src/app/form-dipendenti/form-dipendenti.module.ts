import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormDipendentiPageRoutingModule } from './form-dipendenti-routing.module';

import { FormDipendentiPage } from './form-dipendenti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormDipendentiPageRoutingModule
  ],
  declarations: [FormDipendentiPage]
})
export class FormDipendentiPageModule {}

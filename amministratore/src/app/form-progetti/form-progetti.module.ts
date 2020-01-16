import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormProgettiPageRoutingModule } from './form-progetti-routing.module';

import { FormProgettiPage } from './form-progetti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormProgettiPageRoutingModule
  ],
  declarations: [FormProgettiPage]
})
export class FormProgettiPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginPage
      }
    ])
  ],
  declarations: [LoginPage]
})
export class LoginPageModule { }

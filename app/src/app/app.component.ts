import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import AuthService from './providers/auth.service';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Smart Working',
      url: '/sw',
      icon: 'briefcase'
    },
    {
      title: 'Prenota Posto',
      url: '/prenotaPosto',
      icon: 'map'
    },
    {
      title: 'Progetti',
      url: '/progetti',
      icon: 'list'
    }
  ];
  private subscription: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackOpaque();
      this.splashScreen.hide();

      const firebaseConfig = {
        apiKey: 'AIzaSyCFS_Kx9pZVoYinGyO92SKM_HEgWPdHK7Q',
        authDomain: 'smart-working-5f3ea.firebaseapp.com',
        databaseURL: 'https://smart-working-5f3ea.firebaseio.com',
        projectId: 'smart-working-5f3ea',
        storageBucket: 'smart-working-5f3ea.appspot.com',
        messagingSenderId: '1072133615988',
        appId: '1:1072133615988:web:6f748c0c8a537e7ff4bc21',
        measurementId: 'G-HR9ZDFD32P'
      };
      firebase.initializeApp(firebaseConfig);

      this.ionViewDidEnter();
    });
  }

  logout() {
    this.authService.logout().then( () => {
      this.router.navigate(['/login']);
    });
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}

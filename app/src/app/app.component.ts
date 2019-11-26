import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import AuthService from './providers/auth.service';
import TokenService from './providers/token.service';

import * as firebase from 'firebase/app';
import 'firebase/auth';

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
    private navCtrl: NavController,
    private tokenService: TokenService) {
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
        measurementId: 'G-HR9ZDFD32P',
        vapidKey: 'BNgJjOnSDg1-XIvo06RrWXQnEpdzhwPlorEjtL_6zbIsFnyrsSBewHyTrSPK-N5eMM4cSixWzsmNOgEMXIS9bfg'
      };
      firebase.initializeApp(firebaseConfig);
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

      if (localStorage.getItem('token') !== undefined) {
        this.tokenService.initialize();
      }

      this.ionViewDidEnter();
    });
  }

  logout() {
    this.authService.logout().then( () => {
      this.navCtrl.navigateRoot('/login');
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

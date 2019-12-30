import { CustomHammerConfig } from './custom-hammer-config';
import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'ion2-calendar';
import { Network } from '@ionic-native/network/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotificationsComponent } from './notifications/notifications.component';

import AuthGuard from './providers/auth.guard';
import AuthService from './providers/auth.service';
import TokenService from './providers/token.service';
import LoadingService from './providers/loading.service';

@NgModule({
  declarations: [AppComponent, NotificationsComponent],
  entryComponents: [NotificationsComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, CalendarModule],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    CalendarModule,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
    AuthGuard,
    AuthService,
    TokenService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

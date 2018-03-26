import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from "../pages/login/login";
import { AuthService } from "../providers/auth/auth.service";
import {FCM} from "@ionic-native/fcm";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public authService: AuthService,
              public fcm: FCM
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //this.initFCM();
    });
  }

  initFCM() {
    this.fcm.getToken().then(token => {
      console.log(`token: ${token}`);
      // backend.registerToken(token);
    }).catch(err => {
      console.log(`err: ${JSON.stringify(err)}`);
    });
    this.fcm.onNotification().subscribe(data => {
      alert('message received')
      if(data.wasTapped) {
        console.info("Received in background");
      } else {
        console.info("Received in foreground");
      };
    });
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(`token: ${token}`);
      // backend.registerToken(token);
    });
  }

  openPage(page: string) {
    this.nav.setRoot(page);
  }
}

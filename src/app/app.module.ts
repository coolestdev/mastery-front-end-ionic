import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MsgBoxModule } from "../components/msg-box/msg-box.module";
import { LoginPageModule } from "../pages/login/login.module";
import { ActivatePageModule } from "../pages/activate/activate.module";
import { AuthService } from "../providers/auth/auth.service";
import { HttpModule } from "@angular/http";
import { LessonService } from "../providers/lesson.service";
import { TimetableTabPageModule } from "../pages/timetable-tab/timetable-tab.module";
import { CachedLessonService } from "../providers/cached-lesson.service";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{backButtonText:'',}),
    MsgBoxModule,
    LoginPageModule,
    ActivatePageModule,
    TimetableTabPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    LessonService,
    CachedLessonService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: LOCALE_ID, useValue: "zh-HK" },
  ]
})
export class AppModule {}

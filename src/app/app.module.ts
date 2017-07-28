import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {UserService} from "../providers/user.service";
import {MsgBoxModule} from "../components/msg-box/msg-box.module";
import {LoginPageModule} from "../pages/login/login.module";
import {AuthService} from "../providers/auth/auth.service";
import {HttpModule} from "@angular/http";
import {LessonService} from "../providers/lesson.service";
import { LessonComponent } from '../components/lesson/lesson';
import {LessonModule} from "../components/lesson/lesson.module";
import { MakeupLessonComponent } from '../components/makeup-lesson/makeup-lesson';
import {TimetablePageModule} from "../pages/timetable/timetable.module";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    MsgBoxModule,
    LoginPageModule,
    TimetablePageModule
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
    UserService,
    AuthService,
    LessonService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

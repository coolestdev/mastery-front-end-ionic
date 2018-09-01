import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";

//ionic stuff
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//pages
import { ActivatePageModule } from "../pages/activate/activate.module";
import { LoginPageModule } from "../pages/login/login.module";
import { JournalPageModule } from '../pages/journal/journal.module';
import { TimetableTabPageModule } from "../pages/timetable-tab/timetable-tab.module";

//services
import { AuthService } from "../providers/auth.service";
import { CachedLessonService } from "../providers/cached-lesson.service";
import { LessonService } from "../providers/lesson.service";
import { JournalService } from '../providers/journal-service';

import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{backButtonText:'',}),
    ActivatePageModule,
    JournalPageModule,
    LoginPageModule,
    TimetableTabPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    CachedLessonService,
    JournalService,
    LessonService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LOCALE_ID, useValue: "zh-HK" },
    
  ]
})
export class AppModule {}

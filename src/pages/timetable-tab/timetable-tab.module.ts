import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TimetableTabPage} from "./timetable-tab";
import {TimetablePageModule} from "../timetable/timetable.module";
import {TimetableCalendarPageModule} from "../timetable-calendar/timetable-calendar.module";

@NgModule({
  declarations: [
    TimetableTabPage,
  ],
  imports: [
    IonicPageModule.forChild(TimetableTabPage),
    TimetablePageModule,
    TimetableCalendarPageModule
  ],
  exports: [
    TimetableTabPage
  ]
})
export class TimetableTabPageModule {}

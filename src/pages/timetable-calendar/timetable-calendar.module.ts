import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TimetableCalendarPage} from "./timetable-calendar";

@NgModule({
  declarations: [
    TimetableCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(TimetableCalendarPage)
  ],
  exports: [
    TimetableCalendarPage
  ]
})
export class TimetableCalendarPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegendModule } from "../../components/legend/legend.module";
import { TimetableCalendarPage } from "./timetable-calendar";

@NgModule({
  declarations: [
    TimetableCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(TimetableCalendarPage),
    LegendModule
  ],
  exports: [
    TimetableCalendarPage
  ]
})
export class TimetableCalendarPageModule {}

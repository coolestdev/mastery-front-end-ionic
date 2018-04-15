import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TimetablePage} from "./timetable";
import {LessonModule} from "../../components/lesson/lesson.module";
import {LegendModule} from "../../components/legend/legend.module";
import {MakeupLessonPageModule} from "../makeup-lesson/makeup-lesson.module";

@NgModule({
  declarations: [
    TimetablePage,
  ],
  imports: [
    IonicPageModule.forChild(TimetablePage),
    LessonModule,
    LegendModule,
    MakeupLessonPageModule
  ],
  exports: [
    TimetablePage
  ]
})
export class TimetablePageModule {}

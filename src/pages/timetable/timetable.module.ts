import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TimetablePage} from "./timetable";
import {LessonComponent} from "../../components/lesson/lesson";
import {MakeupLessonModule} from "../../components/makeup-lesson/makeup-lesson.module";
import {LessonModule} from "../../components/lesson/lesson.module";

@NgModule({
  declarations: [
    TimetablePage,
  ],
  imports: [
    IonicPageModule.forChild(TimetablePage),
    LessonModule,
    MakeupLessonModule
  ],
  exports: [
    TimetablePage
  ]
})
export class TimetablePageModule {}

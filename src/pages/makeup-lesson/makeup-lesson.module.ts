import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {LessonModule} from "../../components/lesson/lesson.module";
import {MakeupLessonPage} from "./makeup-lesson";

@NgModule({
  declarations: [
    MakeupLessonPage,
  ],
  imports: [
    IonicPageModule.forChild(MakeupLessonPage),
    LessonModule
  ],
  exports: [
    MakeupLessonPage
  ]
})
export class MakeupLessonPageModule {}

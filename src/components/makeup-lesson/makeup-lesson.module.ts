import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MakeupLessonComponent} from "./makeup-lesson";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MakeupLessonComponent
  ],
  exports:[
    MakeupLessonComponent
  ]
})
export class MakeupLessonModule {}

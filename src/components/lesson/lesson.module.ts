import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LessonComponent} from "./lesson";
import {IonicModule} from "ionic-angular";

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    LessonComponent
  ],
  exports:[
    LessonComponent
  ]
})
export class LessonModule {}

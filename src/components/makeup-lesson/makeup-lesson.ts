import { Component } from '@angular/core';
import {LessonService} from "../../providers/lesson.service";
import {AuthService} from "../../providers/auth/auth.service";
import {Lesson} from "../../models/timetable/lesson";

@Component({
  selector: 'makeup-lesson',
  templateUrl: 'makeup-lesson.html'
})
export class MakeupLessonComponent {

  lessons:Lesson[];

  constructor(public authService: AuthService, public lessonService: LessonService) {
  }

  public chkMkupLson(l:Lesson){
    this.lessons=[];

    this.lessonService.getMkupLson(l,this.authService.user.name).then(lessons=>{
      console.log(lessons);
      this.lessons = lessons;
    });
  }

}

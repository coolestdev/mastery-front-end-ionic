import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Lesson} from "../../models/timetable/lesson";
import {AuthService} from "../../providers/auth/auth.service";
import {LessonService} from "../../providers/lesson.service";

@Component({
  selector: 'lesson',
  templateUrl: 'lesson.html'
})
export class LessonComponent {

  @Input() lesson:Lesson;
  @Output() chkEvt = new EventEmitter<Lesson>();

  constructor(public authService: AuthService, public lessonService: LessonService) {
  }

  public isMkup():boolean{
    for(let s of this.lesson.students){
      if(this.authService.user != null && s.id == this.authService.user.id){
        return s.isMkup;
      }
    }
  }

  public chkMkupLson():void{
    console.log("chkmkupLesson");
    this.chkEvt.emit(this.lesson);
  }

}


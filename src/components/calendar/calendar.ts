import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Calendar, Week, SingleDate } from "../../models/calendar/calendar";
import { AuthService } from "../../providers/auth/auth.service";
import { LessonService } from "../../providers/lesson.service";
import { AlertController } from "ionic-angular";

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})
export class CalendarComponent {
  date:Date;
  calendar: Calendar;
  @Output() selEvt = new EventEmitter<Date>();

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public lessonService: LessonService
    ) {
      var today:Date = new Date();
      this.date = new Date(today.getFullYear(), today.getMonth(), 1);
      this.calendar = Calendar.build(this.date);
  }

  addMonth():void{
    var month:number = this.date.getMonth();

    if(month==11){
      this.date = new Date(this.date.getFullYear()+1, 0, 1);
    }else{
      this.date = new Date(this.date.getFullYear(), this.date.getMonth()+1, 1);
    }
    this.calendar = Calendar.build(this.date);

  }

  minusMonth():void{
    var month:number = this.date.getMonth();

    if(month==0){
        this.date = new Date(this.date.getFullYear()-1, 11, 1);
    }else{
      this.date = new Date(this.date.getFullYear(), this.date.getMonth()-1, 1);
    }
    this.calendar = Calendar.build(this.date);
  }

  selectDate(singleDate:SingleDate):void{

    for (let week of this.calendar.weeks) {
      for (let day of week.days) {
        if (day? day != singleDate : false) {
          day.hasEvent = false;
        }
      }
    }

    singleDate.hasEvent = true;

    if (singleDate != null) {
      this.selEvt.emit(singleDate.date);
    }
  }

}

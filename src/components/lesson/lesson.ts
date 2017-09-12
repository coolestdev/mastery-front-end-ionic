import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Lesson } from "../../models/timetable/lesson";
import { AuthService } from "../../providers/auth/auth.service";
import { LessonService } from "../../providers/lesson.service";
import { AlertController } from "ionic-angular";

@Component({
  selector: 'lesson',
  templateUrl: 'lesson.html'
})
export class LessonComponent {

  @Input() lesson:Lesson;
  @Output() chkEvt = new EventEmitter<Lesson>();

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public lessonService: LessonService
    ) {
  }

  public isMkup():boolean{
    for(let s of this.lesson.students){
      if(this.authService.user != null && s.id == this.authService.user.id){
        return s.isMkup;
      }
    }
  }

  public chkMkupLson(): void{
    console.log("chkmkupLesson");
    this.chkEvt.emit(this.lesson);
  }

  public classify():string{

    if(this.lesson.category.toUpperCase().includes("HOMEWORK")){
      return "homework";
    }else if(this.lesson.category.toUpperCase().includes("CHINESE")||this.lesson.category.toUpperCase().includes("ENGLISH")){
      return "core";
    }

    return "other";
  }

  public showMkupLsonPopup() {
    let prompt = this.alertCtrl.create({
      message: '如要取消或更改已調課堂 請電服務熱線： 4342 0024',
      buttons: [
        {
          text: '致電',
          handler: data => {
            window.open("tel:" + 85212345678);
          }
        },
        {
          text: '確認'
        }
      ]
    });
    prompt.present();
  }

}

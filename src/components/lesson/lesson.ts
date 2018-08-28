 import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Lesson } from "../../models/lesson";
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

    if(!this.authService.user){
      return false;
    }

    if(this.authService.isParent()){
      for(let s of this.lesson.students){
        for(let u of this.authService.user.students){
          if(s.id == u.id){
            return s.isMkup;
          }
        }
      }
    }else{
      for(let s of this.lesson.students){
        if( s.id == this.authService.user.id){
          return s.isMkup;
        }
      }
    }
    return false;
  }

  public chkMkupLson(): void{
    console.log("chkmkupLesson");
    let prompt = this.alertCtrl.create({
      message: '將會開放',
      buttons: [
        {
          text: '返回'
        }
      ]
    });
    prompt.present();
    //this.chkEvt.emit(this.lesson);
  }

  public classify():string{

    if(this.lesson.category.toUpperCase().includes("HOMEWORK")){
      return "homework";
    }else if(this.lesson.category.toUpperCase().includes("CHINESE")
      || this.lesson.category.toUpperCase().includes("ENGLISH")
      || this.lesson.category.toUpperCase().includes("MATHS")
    ) {
      return "core";
    }

    return "other";
  }

  public showMkupLsonPopup() {
    let prompt = this.alertCtrl.create({
      message: '如要取消或更改已調課堂 請電服務熱線： 2567 6889',
      buttons: [
        {
          text: '致電',
          handler: data => {
            window.open("tel:" + 85225676889);
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

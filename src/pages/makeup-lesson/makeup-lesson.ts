import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Lesson} from "../../models/lesson";
import {AuthService} from "../../providers/auth.service";
import {LessonService} from "../../providers/lesson.service";
import {CachedLessonService} from "../../providers/cached-lesson.service";

/**
 * Generated class for the MakeupLessonPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'makeup-lesson'
})
@Component({
  selector: 'page-makeup-lesson',
  templateUrl: 'makeup-lesson.html',
})
export class MakeupLessonPage {

  lessons:Lesson[];
  frLson: Lesson;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private authService : AuthService,
              private lessonService: LessonService,
              private cacheLessonService: CachedLessonService
  ) {
    this.lessons = navParams.get('lessons');
    this.frLson = navParams.get('frLson');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeupLessonPage');
  }

  public ionViewCanEnter(): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      this.navCtrl.setRoot('login');
    }
  }

  public aplyMkup(l:Lesson):void{
    console.log("aplyMkup event capture");
    console.log(`frLson id: ${this.frLson.id}`);

    //TODO: show loading

    if(l.id == null){
      l.id = this.frLson.id;
      this.lessonService.aplyNewMkup(l,this.authService.user.id, this.frLson.id).then(result=>{
        console.log("apply new result=" + result);
        this.procAplyMkupResult(result);
      });
    }else{
      if(this.frLson){
        let stdLsonId:string = "";
        for(let s of this.frLson.students){
          if(s.id == this.authService.user.id){
            stdLsonId = s.stdLsonId;
          }
        }

        if(stdLsonId){
          this.lessonService.aplyExtMkup(l, this.authService.user.id, stdLsonId, this.frLson.id).then(result=>{
            console.log("apply exist result=" + result);
            this.procAplyMkupResult(result);
          });
        }
      }
    }
  }

  private procAplyMkupResult(result:boolean):void{
    this.cacheLessonService.resetCache();
    if(result){
      let prompt = this.alertCtrl.create({
        title: '轉堂成功',
        cssClass: 'customAlert',
        buttons: [
          {
            text: 'OK',
            handler: data => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      prompt.present();
    }else{
      let alert = this.alertCtrl.create({
        title: '轉堂失敗',
        cssClass: 'customAlert',
        buttons: ['OK']
      });
      alert.present();
    }
  }
}

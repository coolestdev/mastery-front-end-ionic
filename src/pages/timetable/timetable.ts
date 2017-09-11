import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { Component, OnInit, ViewChild } from '@angular/core';

//import * as jQuery from 'jquery';
import {Timetable} from "../../models/timetable/timetable";
import {Lesson} from "../../models/timetable/lesson";
import {AuthService} from "../../providers/auth/auth.service";
import {LessonService} from "../../providers/lesson.service";
import {LessonOfDay} from "../../models/timetable/lesson-of-day";


@IonicPage({
  name: 'timetable'
})
@Component({
  selector: 'timetable',
  templateUrl: './timetable.html'
})
export class TimetablePage {

  timetable: Timetable;
  weekNo: number;
  isLoadingMore: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private authService:AuthService,
    private lessonService: LessonService){
    this.timetable = new Timetable();
  };

  ionViewWillEnter(): void {
    if (!this.ionViewCanEnter()) return;
    this.weekNo = 1;
    this.timetable.lessonOfDays = [];

    this.lessonService.getWeeklyLsonByStd(this.authService.user.name,this.weekNo)
      .then(lessons=>{
        this.lsonToLsonDay(lessons);
      }).catch(()=>{
      let alert = this.alertCtrl.create({
        title: 'System error',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  showLoading(content: string): any {
    let loading = this.loadingCtrl.create({
      content: content
    });
    return loading;
  }

  public chkMkupLson(l:Lesson):void{
    console.log("chkMkup event capture");

    let loading = this.showLoading('找尋合適課堂中...');
    loading.present();

    this.lessonService.getMkup(l,this.authService.user.name).then(lessons=>{
      loading.dismiss();
      console.log(lessons);
      if(lessons.length>0){
        this.navCtrl.push('makeup-lesson', {
          lessons: lessons,
          frLson: l
        });
      } else {
        let alert = this.alertCtrl.create({
          title: '無堂可轉',
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }

  private lsonToLsonDay(lsons:Lesson[]){
    let map: Map<string,LessonOfDay> = new Map();
    for(var l of lsons){
      var tempDate:Date = new Date(l.startDateTime);
      var date:Date = new Date(tempDate.getFullYear(),tempDate.getMonth(), tempDate.getDate());
      //console.log(date.toLocaleString());
      //console.log(l);
      //console.log(l.room.name);
      if(map.has(date.getTime().toString())){
        //console.log("contains");
        let lod:LessonOfDay = map.get(date.getTime().toString());
        //console.log(lod);
        lod.lessons.push(l);
      }else{
        //console.log("not contains");
        let lod = new LessonOfDay;
        lod.date = date;
        lod.dayOfWeek = this.dayToDayStr(date.getDay());
        lod.lessons = new Array<Lesson>();
        lod.lessons.push(l);
        map.set(date.getTime().toString(),lod);
      }
    }

    for(var v of Array.from(map.values())){
      console.log(`${JSON.stringify(v)}`);
      this.timetable.lessonOfDays.push(v);
    }

  }

  ngAfterViewInit(){
    //jQuery('#makeupLessonReveal').foundation();
  }

  public ionViewCanEnter(): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      this.authService.redirectUrl='timetable-tab';
      this.navCtrl.setRoot('login');
    }
  }

  doInfinite(infiniteScroll) {
    this.weekNo++;
    this.lessonService.getWeeklyLsonByStd(this.authService.user.name,this.weekNo)
      .then(lessons=>{
        this.lsonToLsonDay(lessons);
        infiniteScroll.complete();
      }).catch(()=>{
        let alert = this.alertCtrl.create({
          title: 'System error',
          buttons: ['OK']
        });
        alert.present();
        infiniteScroll.complete();
      });
  }

  loadMoreLesson() {
    this.weekNo++;
    this.isLoadingMore = true;
    this.lessonService
      .getWeeklyLsonByStd(this.authService.user.name,this.weekNo)
      .then(lessons=>{
        this.lsonToLsonDay(lessons);
        this.isLoadingMore = false;
      }).catch(()=>{
        this.isLoadingMore = false;
        let alert = this.alertCtrl.create({
          title: 'System error',
          buttons: ['OK']
        });
        alert.present();
      });
  }

  private dayToDayStr(day:number):string{
    switch(day){
      case 0:
        return "星期日";
      case 1:
        return "星期一";
      case 2:
        return "星期二";
      case 3:
        return "星期三";
      case 4:
        return "星期四";
      case 5:
        return "星期五";
      case 6:
        return "星期六";
    }
  }
}

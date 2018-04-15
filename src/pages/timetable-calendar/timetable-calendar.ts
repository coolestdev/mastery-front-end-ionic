import { Component,ElementRef,ViewChild,DoCheck } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from "../../models/timetable/calendar";
import { Lesson } from "../../models/timetable/lesson";
import { AuthService} from "../../providers/auth/auth.service";
import { CachedLessonService } from "../../providers/cached-lesson.service";
import { Timetable } from "../../models/timetable/timetable";
import { LessonOfDay } from "../../models/timetable/lesson-of-day";

@IonicPage({
  name: 'timetable-calendar'
})
@Component({
  selector: 'page-timetable-calendar',
  templateUrl: 'timetable-calendar.html',
})
export class TimetableCalendarPage implements DoCheck {
  calendar: Calendar;
  timetable: Timetable;
  isLoadingMore: boolean = false;
  today = new Date();
  tableHeight:number = 0;
  headerHeight:number = 0;
  platformHeight:number = 0;
  contentHeight:number = 0;
  legendHeight:number = 0;

  @ViewChild('calTable')
  calTable:ElementRef;

  @ViewChild('headDiv')
  headDiv:ElementRef;

  @ViewChild('legend',{read: ElementRef})
  legend:ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private platform: Platform,
    private authService: AuthService,
    private cachedLessonService: CachedLessonService
  ) {
    this.calendar = Calendar.build(new Date());
    this.timetable = new Timetable();
  }

  showLoading(content: string): any {
    let loading = this.loadingCtrl.create({
      content: content,
      cssClass: 'customLoading'
    });
    return loading;
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad TimetableCalendarPage');
    this.timetable = new Timetable();

    this.loadLson();
  }

  private loadLson():void{
    let loading = this.showLoading('載入中...');
    loading.present();

    if(this.authService.isParent()){
      this.cachedLessonService.getPrtLessons(this.authService.user.contact, 5)
        .then(lessons => {
          this.lsonToLsonDay(lessons);
          loading.dismiss();
        }).catch((e) => {
          console.error(e);

          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'System error',
            buttons: ['OK']
          });
          alert.present();
        });
    }else{
      this.cachedLessonService.getStdLessons(this.authService.user.name, 5)
        .then(lessons => {
          this.lsonToLsonDay(lessons);
          loading.dismiss();
        }).catch((e) => {
          console.error(e);

          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'System error',
            buttons: ['OK']
          });
          alert.present();
        });
    }

  }

  public ionViewCanEnter(): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      this.authService.redirectUrl='timetable-tab';
      this.navCtrl.setRoot('login');
    }
  }

  isMkup(lesson: Lesson): boolean {

    if(!this.authService.user){
      return false;
    }

    if(this.authService.isParent()){
      for(let s of lesson.students){
        for(let u of this.authService.user.students){
          if(s.id == u.id){
            return s.isMkup;
          }
        }
      }
    }else{
      for(let s of lesson.students){
        if( s.id == this.authService.user.id){
          return s.isMkup;
        }
      }
    }
    return false;

  }

  public classify(lesson: Lesson):string{
    console.log("classify = " + lesson.category.toUpperCase());
    if(lesson.category.toUpperCase().includes("HOMEWORK")){
      return "homework";
    }else if(lesson.category.toUpperCase().includes("CHINESE")||lesson.category.toUpperCase().includes("ENGLISH")){
      return "core";
    }

    return "other";
  }

  private lsonToLsonDay(lsons:Lesson[]){
    let map: Map<string,LessonOfDay> = new Map();
    for(var l of lsons){
      var tempDate:Date = new Date(l.startDateTime);
      var date:Date = new Date(tempDate.getFullYear(),tempDate.getMonth(), tempDate.getDate());

      this.calendar.setHasEvent(date, true);

      if(map.has(date.getTime().toString())){
        let lod:LessonOfDay = map.get(date.getTime().toString());
        lod.lessons.push(l);
      }else{
        let lod = new LessonOfDay;
        lod.date = date;
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

  private needSplit():boolean{
    if(this.platform.width()>576){
      return true;
    }
    return false;
  }

  //sometimes the platformHeight will become zero
  //the approximate height of header bar + bottom bar = 2.5 of header height
  ngDoCheck(){
    console.log("ngDoCheck");
    this.tableHeight = this.calTable.nativeElement.offsetHeight;
    this.headerHeight = this.headDiv.nativeElement.offsetHeight;
    this.legendHeight = this.legend.nativeElement.offsetHeight;
    this.platformHeight = this.platform.height();
    if(this.needSplit()){
      if(this.platformHeight>0){
          this.contentHeight = this.platformHeight - (this.headerHeight * 2.6);
      }
    }else{
      if(this.platformHeight>0){
        this.contentHeight = this.platformHeight - this.tableHeight - this.legendHeight - (this.headerHeight * 2.6);
      }
    }
    console.log("tableHeight=" + this.tableHeight);
    console.log("headerHeight=" + this.headerHeight * 3);
    console.log("platformHeight=" + this.platformHeight);
    console.log("contentHeight=" + this.contentHeight);
  }

  getContentHeight():number{
     return this.contentHeight;
  }

}

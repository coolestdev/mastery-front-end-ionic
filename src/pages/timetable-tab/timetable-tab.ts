import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TimetablePage} from "../timetable/timetable";
import {TimetableCalendarPage} from "../timetable-calendar/timetable-calendar";

@IonicPage({
  name: 'timetable-tab',
  segment: 'timetable-tab/:tabIndex'
})
@Component({
  selector: 'page-timetable-tab',
  templateUrl: 'timetable-tab.html',
})
export class TimetableTabPage {
  timetablePage: any;
  timetableCalendarPage: any;
  mySelectedIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.timetablePage = TimetablePage;
    this.timetableCalendarPage = TimetableCalendarPage;
    this.mySelectedIndex = navParams.get('tabIndex') || 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimetableTabPage');
  }

}

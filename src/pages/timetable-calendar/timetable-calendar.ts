import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Calendar} from "../../models/timetable/calendar";
import {Lesson} from "../../models/timetable/lesson";
import {AuthService} from "../../providers/auth/auth.service";

/**
 * Generated class for the TimetableCalendarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-timetable-calendar',
  templateUrl: 'timetable-calendar.html',
})
export class TimetableCalendarPage {
  calendar: Calendar<Lesson>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService
  ) {
    this.calendar = Calendar.build<Lesson>(new Date());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimetableCalendarPage');
  }

}

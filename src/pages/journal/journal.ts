import { Component } from '@angular/core';
import { NavController } from "ionic-angular";

/**
 * Generated class for the JournalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html',
})
export class JournalPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalPage');
  }

}

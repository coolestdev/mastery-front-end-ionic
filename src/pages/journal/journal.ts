import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { Journal } from '../../models/journal';
import { AuthService } from "../../providers/auth.service";
import { JournalService } from "../../providers/journal-service"

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

  public journals:Journal[];

  constructor(
    public navCtrl: NavController,
    private authService : AuthService,
    private journalService: JournalService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalPage');
  }

}

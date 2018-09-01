import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from "ionic-angular";
import { Journal } from '../../models/journal';
import { AuthService } from "../../providers/auth.service";
import { JournalService } from "../../providers/journal-service"

/**
 * Generated class for the JournalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name: 'page-journal'
})
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html',
})
export class JournalPage {

  public journals: Journal[];
  public selectedStdId: String;
  public index: number;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private journalService: JournalService) {
    
    this.index = 0;

    if (this.authService.isParent()) {
      if (this.authService.user.students.length > 0) {
        this.selectedStdId = this.authService.user.students[0].id;
      }
    } else {
      this.selectedStdId = this.authService.user.id;
    }

    this.journalService.getJournalByStd(this.selectedStdId, this.index++).then(
      (journals) => {
        if (journals && journals.length > 0) {
          this.journals = journals;
        } else {
          let alert = this.alertCtrl.create({
            title: '找不到教學日誌',
            cssClass: 'customAlert',
            buttons: ['OK']
          });
          alert.present();
        }
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalPage');
  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {
      
      this.journalService.getJournalByStd(this.selectedStdId,this.index++).then(
        (journals) => {
          if(journals){
            
            for(let journal of journals){
              console.log(journal.id);
              this.journals.push(journal);
            }
            
          }
  
          infiniteScroll.complete();
  
        }
      )

    }, 500);
  }
}
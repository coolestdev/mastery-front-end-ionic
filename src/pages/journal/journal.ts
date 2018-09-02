import { Component, Input } from '@angular/core';
import { IonicPage, NavController, AlertController } from "ionic-angular";
import { Journal } from '../../models/journal';
import { Student } from '../../models/student';
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

  journals: Journal[];
  @Input()selectedStd: Student;
  index: number;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private journalService: JournalService) {
    
    this.index = 0;

    if (this.authService.isParent()) {
      if (this.authService.user.students.length > 0) {
        this.selectedStd = this.authService.user.students[0];
      }
    } else {
      this.selectedStd = new Student();
      this.selectedStd.id = this.authService.user.id;
      this.selectedStd.name = this.authService.user.name;
    }

    this.getJournal();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalPage');
  }

  getJournal(){
    console.log("getJournal");
    this.journalService.getJournalByStd(this.selectedStd.id, this.index++).then(
      (journals) => {
        if (journals && journals.length > 0) {
          this.journals = journals;
        } else {
          this.journals = [];
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

  doInfinite(infiniteScroll) {

    setTimeout(() => {
      
      this.journalService.getJournalByStd(this.selectedStd.id,this.index++).then(
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
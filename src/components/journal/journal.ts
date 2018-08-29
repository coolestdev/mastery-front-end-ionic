import { Component, Input } from '@angular/core';
import { Student } from '../../models/student';
import { Journal } from '../../models/journal';
import { JournalService } from '../../providers/journal-service';

/**
 * Generated class for the JournalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'journal',
  templateUrl: 'journal.html'
})
export class JournalComponent {

  @Input()student:Student
  journals:Journal[];
  index:number;

  constructor(
    public journalService:JournalService
  ) {
    this.index = 0;
    // this.journals = journalService.getJournalByStd(this.student.id,this.index);
  }

}

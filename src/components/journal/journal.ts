import { Component, Input } from '@angular/core';
import { Journal } from '../../models/journal';

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

  @Input()journals:Journal;

  constructor() {}

}

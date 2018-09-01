import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalModule } from "../../components/journal/journal.module";
import { JournalPage } from "./journal";

@NgModule({
  declarations: [
    JournalPage,
  ],
  imports: [
    IonicPageModule.forChild(JournalPage),
    JournalModule
  ],
  exports: [
    JournalPage
  ]
})
export class JournalPageModule {}

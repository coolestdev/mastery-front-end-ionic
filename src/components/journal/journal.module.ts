import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalComponent } from "./journal";
import { IonicModule } from "ionic-angular";

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    JournalComponent
  ],
  exports:[
    JournalComponent
  ]
})
export class JournalModule {}

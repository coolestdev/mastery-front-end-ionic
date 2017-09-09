import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivatePage } from "./activate";
import { MsgBoxModule } from "../../components/msg-box/msg-box.module";

@NgModule({
  declarations: [
    ActivatePage,
  ],
  imports: [
    IonicPageModule.forChild(ActivatePage),
    MsgBoxModule
  ],
  exports: [
    ActivatePage
  ]
})
export class ActivatePageModule {}

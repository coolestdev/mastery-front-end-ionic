import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ChangePasswordPage} from "./change-password";
import {MsgBoxModule} from "../../components/msg-box/msg-box.module";

@NgModule({
  declarations: [
    ChangePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangePasswordPage),
    MsgBoxModule
  ],
  exports: [
    ChangePasswordPage
  ]
})
export class ChangePasswordPageModule {}

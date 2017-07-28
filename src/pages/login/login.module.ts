import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {LoginPage} from "./login";
import {MsgBoxModule} from "../../components/msg-box/msg-box.module";

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    MsgBoxModule
  ],
  exports: [
    LoginPage
  ]
})
export class LoginPageModule {}

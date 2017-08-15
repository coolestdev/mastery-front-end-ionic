import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MsgBoxComponent} from "../../components/msg-box/msg-box.component";
import {AuthService} from "../../providers/auth/auth.service";

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name: 'change-password'
})
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  username: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  @ViewChild(MsgBoxComponent)
  msgBox:MsgBoxComponent;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  missingInput(): boolean {
    if (this.oldPassword.length <= 0
      || this.newPassword.length <= 0
      || this.confirmPassword.length <= 0
    )
      return true;

    return false;
  }

  changePassword() {
    if (!this.validated()) return;

    if (this.authService.changePwd(this.oldPassword, this.newPassword)) {
      let prompt = this.alertCtrl.create({
        title: '成功更改密碼',
        buttons: [
          {
            text: 'OK',
            handler: data => {
              this.navCtrl.setRoot('timetable-tab');
            }
          }
        ]
      });
      prompt.present();
    } else {
      let prompt = this.alertCtrl.create({
        title: '更改密碼失敗',
        buttons: [
          {
            text: 'OK'
          }
        ]
      });
      prompt.present();
    }

  }

  private validated(): boolean {
    if (this.newPassword != this.confirmPassword) {
      this.msgBox.sendWarningMsg('新密碼不相同!');
      return false;
    }

    return true;
  }
}

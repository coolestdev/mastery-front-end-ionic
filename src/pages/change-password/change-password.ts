import { Component} from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService} from "../../providers/auth/auth.service";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  changePassword() {

    this.authService.changePwd(this.oldPassword, this.newPassword).then(
      response => {
        if(response){
          let prompt = this.alertCtrl.create({
            title: '成功更改密碼',
            cssClass: 'customAlert',
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
        }else{
          let prompt = this.alertCtrl.create({
            title: '更改密碼失敗',
            cssClass: 'customAlert',
            buttons: [
              {
                text: 'OK'
              }
            ]
          });
          prompt.present();
        }
      }
    )
  }

}

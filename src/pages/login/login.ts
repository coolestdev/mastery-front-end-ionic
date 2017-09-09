import { Component, Input, ViewChild } from '@angular/core';
import {Logger} from "../../providers/logger/logger";
import {AuthService} from "../../providers/auth/auth.service";
import {Alert, AlertController, IonicPage, NavController} from "ionic-angular";
import {MsgBoxComponent} from "../../components/msg-box/msg-box.component";

@IonicPage({
  name: 'login'
})
@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class LoginPage {

  private logger:Logger = Logger.getLogger(this.constructor.name);

  @ViewChild(MsgBoxComponent)
  msgBox:MsgBoxComponent;

  message: string;
  waiting: boolean;
  @Input() username: string;
  @Input() password: string;

  constructor(
    public authService: AuthService,
    public nav: NavController,
    public alertCtrl: AlertController,
  ) {
    this.waiting = false;
    this.username = '';
    this.password = '';
  }

  ngOnInit(){
    this.msgBox.clearMsg();
    if (localStorage.getItem('username') != null) this.username=localStorage.getItem('username');
    this.password='';
  }

  ionViewDidLoad() {
    // for testing
    //this.autoLogin();

    this.authService.checkServer().then((value) => {
      if (!value) this.showNetworkAlert();
    }).catch(() => {
      this.showNetworkAlert();
    })
  }

  showNetworkAlert() {
    let alert = this.alertCtrl.create({
      title: '未能連接伺服器 <br/>請檢查網絡',
      cssClass: 'customAlert',
      buttons: ['OK']
    });
    alert.present();
  }

  autoLogin() {
    this.username='';
    this.password='';
    this.login();
  }

  toChangePasswordPage() {
    this.nav.push('change-password');
  }

  toActivatePage() {
    this.nav.push('activate');
  }

  login() {
    this.msgBox.sendPriMsg('登入中...');
    this.waiting = true;
    this.authService.login(this.username, this.password)
      .then(
        (value) => {
          console.log(value);
          localStorage.setItem('username', this.username);
          this.waiting = false;
          if(value){
            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'timetable-tab';
            this.logger.debug(redirect);
            this.nav.setRoot(redirect);
          }else{
            this.msgBox.sendWarningMsg('密碼錯誤');
          }
        }
      )
      .catch((reject)=>{
          this.waiting = false;
          this.logger.error(reject);
          this.msgBox.sendAlterMsg('無此用戶');
        }

      )
  }

  clearInput() {
    this.username = '';
    this.password = '';
  }


}

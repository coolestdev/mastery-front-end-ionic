import {Component, Input} from '@angular/core';
import {Logger} from "../../providers/logger/logger";
import {AuthService} from "../../providers/auth/auth.service";
import {AlertController, LoadingController, ToastController, IonicPage, NavController} from "ionic-angular";

@IonicPage({
  name: 'login'
})
@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class LoginPage {

  private logger:Logger = Logger.getLogger(this.constructor.name);

  message: string;
  waiting: boolean;
  @Input() username: string;
  @Input() password: string;

  constructor(
    public authService: AuthService,
    public nav: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
  ) {
    this.waiting = false;
    this.username = '';
    this.password = '';
  }

  ngOnInit(){

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

  showLoading(content: string): any {
    let loading = this.loadingCtrl.create({
      content: content,
      cssClass: 'customLoading'
    });
    return loading;
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

    this.waiting = true;

    let loading = this.showLoading('登入中...');
    loading.present();

    this.authService.login(this.username, this.password)
      .then(
        (value) => {
          loading.dismiss();
          console.log(value);
          localStorage.setItem('username', this.username);
          this.waiting = false;
          if(value){
            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'timetable-tab';
            this.logger.debug(redirect);
            this.nav.setRoot(redirect);
          }else{
            this.showMsg('密碼錯誤');
          }
        }
      )
      .catch((reject)=>{
          this.waiting = false;
          this.logger.error(reject);
          this.showMsg('無此用戶');
        }

      )
  }

  private showMsg(msg:string){
    let toast = this.toastCtrl.create({
      message: `${msg}`,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  clearInput() {
    this.username = '';
    this.password = '';
  }


}

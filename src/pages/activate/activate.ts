import { Component, OnInit, Input } from '@angular/core';
import { Logger } from "../../providers/logger/logger";
import { AuthService } from "../../providers/auth/auth.service";
import { AlertController, ToastController, IonicPage, NavController } from "ionic-angular";

@IonicPage({
  name: 'activate'
})
@Component({
  selector: 'page-activate',
  templateUrl: './activate.html',
})
export class ActivatePage {

  message: string;
  waiting: boolean;
  @Input() stdName: string;
  @Input() phone: string;
  @Input() mobile: string;

  constructor(
    public authService: AuthService,
    public nav: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
  ) {
    this.waiting = false;
    this.stdName = '';
    this.phone = '';
    this.mobile = '';
  }

  ngOnInit(){
  }

  ionViewDidLoad() {
    // for testing
    //this.autoLogin();
  }

  activiate() {
    this.waiting = true;

    let prompt = this.alertCtrl.create({
          title: `號碼 ${this.mobile} 是否正確?`,
          subTitle: `登入密碼將經&nbsp;What\'s app&nbsp;傳送`,
          cssClass: 'customAlert',
          buttons: [
            {
              text: '否',
              handler: data => {

              }
            },
            {
              text: '是',
              handler: data => {
                this.proceed();
              }
            }
          ]
        });
        prompt.present();
  }

  private proceed(){
    this.authService.activate(this.stdName, this.phone, this.mobile).then(
      response => {
        this.waiting=false;
        if(response){
          let toast = this.toastCtrl.create({
            message: '啟動成功!',
            duration: 3000,
            position: 'top'
          });
          toast.present();
          //localStroage.setItem("username",this.stdName);
          this.nav.setRoot("login");
        }else{
          let toast = this.toastCtrl.create({
            message: '啟動失敗!',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
      }
    )
  }

  clearInput() {
    this.stdName = '';
    this.phone = '';
    this.mobile = '';
  }


}

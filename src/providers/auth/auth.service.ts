import { Injectable } from '@angular/core';
import {User} from "../../models/user/user";
import {App, NavController} from "ionic-angular";
import {Auth} from "../../models/user/auth";
import {Http} from "@angular/http";

declare const ENV;

@Injectable()
export class AuthService {

  user:User;
  isLoggedIn: boolean = false;
  redirectUrl: string;
  loginUrl = ENV.masteryRestUrl + '/login';
  updPwdUrl = ENV.masteryRestUrl + '/user/updatepwd/';
  checkUrl = ENV.masteryRestUrl + '/check';

  constructor(protected app: App, private http: Http) {
  }

  getNavCtrl(): NavController {
    return this.app.getRootNav();
  }

  private handleError(error: any): void {
    console.error('An error occurred', error); // for demo purposes only
  }

  login(username:string,pwd:string): Promise<boolean> {
    let auth:Auth = new Auth();
    auth.username=username;
    auth.pwd=pwd
    return this.http.post(this.loginUrl,auth).toPromise().then(
      response => {
        if(response!=null){
          this.user = response.json() as User;
          this.isLoggedIn = true;
          return true;
        }
      }
    ).catch(this.handleError);
  }

  changePwd(oldPwd:string,newPwd:string){
    console.log("changePwd");
    let parm:string = `/${this.user.id}/${oldPwd}/${newPwd}/`;
    let reqUrl:string = this.updPwdUrl + parm;
    return this.http.get(reqUrl).toPromise().then(
      response => {
        if(response!=null){
          var result:boolean = response.json() as boolean;
          console.log(result);
          return result;
        }
      }
    ).catch(this.handleError);
  }

  checkServer() : Promise<boolean> {
    console.log("check server");

    return this.http.get(this.checkUrl).toPromise().then(
      response => {
        return response.json() as boolean
      }
    ).catch(() => {
      return Promise.resolve(false);
    })
  }

  hasStudentRight():boolean{
    if(this.user){
        return (this.user.role == 'student')
    }
    return false;
  }

  hasTeacherRight():boolean{
    if(this.user){
        return (this.user.role == 'teacher' || this.user.role =='admin')
    }
    return false;
  }

  hasAdminRight():boolean{
    if(this.user){
        return this.user.role == 'admin'
    }
    return false;
  }

  logout(): void {
    this.user = null;
    this.isLoggedIn = false;
    this.getNavCtrl().setRoot('login');
  }
}

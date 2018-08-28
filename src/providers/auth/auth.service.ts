import { Injectable } from '@angular/core';
import {User} from "../../models/user";
import {App, NavController} from "ionic-angular";
import {Auth} from "../../models/auth";
import {Http} from "@angular/http";

declare const ENV;

@Injectable()
export class AuthService {

  user:User;
  isLoggedIn: boolean = false;
  redirectUrl: string;
  stdLoginUrl = ENV.masteryRestUrl + '/student/login';
  prtLoginUrl = ENV.masteryRestUrl + '/parent/login';
  updPwdUrl = ENV.masteryRestUrl + '/user/updatepwd';
  actUrl = ENV.masteryRestUrl + '/user/activate'
  checkUrl = ENV.masteryRestUrl + '/check';

  constructor(protected app: App, private http: Http) {
  }

  getNavCtrl(): NavController {
    return this.app.getRootNav();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  activate(studentName:string, phone:string, mobile:string): Promise<boolean>{
    let parm:string = `/${studentName}/${phone}/${mobile}/`;
    let reqUrl:string = this.actUrl + parm;
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

  studentLogin(username:string,pwd:string): Promise<boolean> {
    let auth:Auth = new Auth();
    auth.username=username;
    auth.pwd=pwd
    return this.http.post(this.stdLoginUrl,auth).toPromise().then(
      response => {
        if(response!=null){
          this.user = response.json() as User;
          this.isLoggedIn = true;
          return true;
        }
      }
    ).catch(this.handleError);
  }

  parentLogin(username:string,pwd:string): Promise<boolean> {
    let auth:Auth = new Auth();
    auth.username=username;
    auth.pwd=pwd
    return this.http.post(this.prtLoginUrl,auth).toPromise().then(
      response => {
        if(response!=null){
          this.user = response.json() as User;
          this.isLoggedIn = true;
          return true;
        }
      }
    ).catch(this.handleError);
  }

  changePwd(oldPwd:string,newPwd:string): Promise<boolean> {
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

  isStudent():boolean{
    if(this.user){
        return (this.user.role == 'student');
    }
    return false;
  }

  isTeacher():boolean{
    if(this.user){
        return (this.user.role == 'teacher');
    }
    return false;
  }

  isAdmin():boolean{
    if(this.user){
        return this.user.role == 'admin';
    }
    return false;
  }

  isParent():boolean{
    if(this.user){
      return this.user.role == 'parent';
    }
    return false;
  }

  logout(): void {
    this.user = null;
    this.isLoggedIn = false;
    this.getNavCtrl().setRoot('login');
  }
}

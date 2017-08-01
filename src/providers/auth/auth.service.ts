import { Injectable } from '@angular/core';
import {User} from "../../models/user/user";
import {App, NavController} from "ionic-angular";

@Injectable()
export class AuthService {

  user:User;
  isLoggedIn: boolean = false;
  redirectUrl: string;

  constructor(protected app: App) {
  }

  getNavCtrl(): NavController {
    return this.app.getRootNav();
  }

  private handleError(error: any): void {
    console.error('An error occurred', error); // for demo purposes only
  }

  login(username:string,pwd:string): Promise<Boolean> {
    //let role = new Role();
    //role.type = "student";

    this.user=new User();
    this.user.name = username;
    //this.user.role = role;
    this.isLoggedIn = true;
    return Promise.resolve(true);

    // return this.userService.getUserByUsername(username)
    // .then(user => {
    //   if(user.pwd===pwd){
    //     this.user = user;
    //     this.isLoggedIn = true;
    //     return true;
    //   }else{
    //     return false;
    //   }
    // })
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

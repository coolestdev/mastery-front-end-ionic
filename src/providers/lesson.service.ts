import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Lesson} from "../models/timetable/lesson";

declare const ENV;

@Injectable()
export class LessonService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private lessonUrl = ENV.masteryRestUrl + '/lesson/student';
  private mkupUrl = ENV.masteryRestUrl + '/mkup';
  private mkupFindUrl = this.mkupUrl + '/find';
  private mkupAplyUrl = this.mkupUrl + '/apply';
  private mkupNewUrl = this.mkupAplyUrl + '/new';
  private mkupExtUrl = this.mkupAplyUrl + '/exist';

  constructor(private http:Http){}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getWeeklyLsonByStd(name:string,weekNo:number): Promise<Lesson[]> {
    let parm:string = `/${name}/${weekNo}/`
    let reqUrl:string = this.lessonUrl + parm;
    console.log("reqUrl=" + reqUrl);
    return this.http.get(reqUrl)
      .toPromise()
      .then(response => {
        console.log(response.json());
        return response.json() as Lesson[];
      })
      .catch(this.handleError);
  }

  getMkup(l:Lesson, stdName:string): Promise<Lesson[]>{
    let reqUrl:string = this.mkupFindUrl + `/${stdName}/`
    return this.http.post(reqUrl,l).toPromise().then(
      response => {
        return response.json() as Lesson[]
      }
    ).catch(this.handleError);
  }

  aplyNewMkup(toLson:Lesson, stdId:string): Promise<boolean>{
    let reqUrl:string = this.mkupNewUrl + `/${stdId}/`
    return this.http.post(reqUrl,toLson).toPromise().then(
      response => {
        return response.json() as boolean;
      }
    ).catch(this.handleError);
  }

  aplyExtMkup(toLson:Lesson, stdLsonId:string): Promise<boolean>{
    let reqUrl:string = this.mkupExtUrl + `/${stdLsonId}/`
    return this.http.post(reqUrl,toLson).toPromise().then(
      response => {
        return response.json() as boolean;
      }
    ).catch(this.handleError);
  }

}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Journal } from '../models/journal';
import 'rxjs/add/operator/map';

declare const ENV;

@Injectable()
export class JournalService {

  private journalUrl = ENV.masteryRestUrl + '/journal'

  constructor(private http: Http) {}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getJournalByStd(stdId:String,index:number):Promise<Journal[]>{
    let parm:string = `/${stdId}/${index}/`
    let reqUrl:string = this.journalUrl + parm;
    console.log("reqUrl=" + reqUrl);
    return this.http.get(reqUrl)
      .toPromise()
      .then(response => {
        console.log(response.json());
        return response.json() as Journal[];
      })
      .catch(this.handleError);
  }

}

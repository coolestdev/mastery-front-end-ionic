import { Injectable }    from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Lesson} from "../models/timetable/lesson";
import {LessonService} from "./lesson.service";

@Injectable()
export class CachedLessonService {
  weekNo: number = 0;
  lessons: Lesson[] = [];

  constructor(private lessonService:LessonService){}

  resetCache(): void {
    this.weekNo = 1;
    this.lessons = [];
  }

  getLessons(name: string, inputWeekNo: number): Promise<Lesson[]> {
    console.log(`getting lessons from cached for ${name} until week ${inputWeekNo}`);

    if (inputWeekNo <= this.weekNo) {
      return Promise.resolve(this.lessons);
    }

    var loadingFunctions: Promise<Lesson[]>[] = [];
    for (var i = this.weekNo + 1; i <= inputWeekNo; i++) {
      loadingFunctions.push(this.lessonService.getWeeklyLsonByStd(name, i))
    }

    return Promise.all(loadingFunctions)
      .then((res) => {
        this.weekNo = inputWeekNo;
        for (let lessons of res) {
          console.log(`${lessons}`);
          this.lessons.push(...lessons);
        }
        console.log('done');
        return Promise.resolve(this.lessons)
      });
  }

}
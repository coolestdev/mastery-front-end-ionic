export class Calendar {
  weeks: Week[] = [];

  public static build(today: Date) : Calendar {
    var c = new Calendar();
    var week = new Week();
    var lastDay = today;

    while (c.weeks.length < 4) {
      week.days[lastDay.getDay()] = new SingleDate(lastDay);
      lastDay = new Date(lastDay.getTime() + (1000 * 60 * 60 * 24));

      // i.e. sunday
      if (lastDay.getDay() == 0) {
        c.weeks.push(week);
        week = new Week();
      }
    }
    return c;
  }

  public setHasEvent(inputDate: Date, hasEvent: boolean) {
    this.weeks.forEach(w => {
      w.days
        .filter(d => d != null)
        .filter(d => d.date.toDateString() == inputDate.toDateString())
        .forEach(d => {
          console.log(`set hasEvent = ${hasEvent} on ${inputDate}`);
          d.hasEvent = hasEvent;
        })
    })
  }
}

export class Week {
  days: SingleDate[] = [null, null, null, null, null, null, null];
}

export class SingleDate {
  public isToday: boolean;
  public hasEvent: boolean;

  constructor(public date: Date) {
    this.isToday = date.toDateString() == (new Date()).toDateString();
  }
}


export class Calendar<T> {
  weeks: Week<T>[] = [];

  public static build<T>(today: Date) : Calendar<T> {
    var c = new Calendar<T>();
    var week = new Week<T>();
    var lastDay = today;

    while (c.weeks.length < 4) {
      console.log(`${lastDay} : ${lastDay.getDay()}`);
      week.days[lastDay.getDay()] = new SingleDate<T>(lastDay);
      lastDay = new Date(lastDay.getTime() + (1000 * 60 * 60 * 24));

      // i.e. sunday
      if (lastDay.getDay() == 0) {
        c.weeks.push(week);
        week = new Week<T>();
      }
    }
    return c;
  }
}

export class Week<T> {
  days: SingleDate<T>[] = [null, null, null, null, null, null, null];
}

export class SingleDate<T> {
  isToday: boolean;
  events: T[];

  constructor(private date: Date) {
    this.isToday = date.toDateString() == (new Date()).toDateString();
    console.log(`${date} isToday? ${this.isToday}`);
  }
}


import {Room} from "./room";
import {Teacher} from "./teacher";
import {Student} from "./student";
export class Lesson{
  id: number;
  name: string;
  frLvl: string;
  toLvl: string;
  category: string;
  startDateTime: Date;
  endDateTime: Date;
  room: Room;
  teacher: Teacher;
  student: Student;
  students: Student[];
}

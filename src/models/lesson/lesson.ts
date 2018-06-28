import {Room} from "../facility/room";
import {Teacher} from "../role/teacher";
import {Student} from "../role/student";
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

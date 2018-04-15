import {Student} from "../timetable/student";

export class User{
  id: string;
  name: string;
  contact: string;
  role: string;
  students: Student[];
}

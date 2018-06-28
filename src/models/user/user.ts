import {Student} from "../role/student";

export class User{
  id: string;
  name: string;
  contact: string;
  role: string;
  students: Student[];
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student, students } from '../interfaces/student';

@Injectable()
export class StudentService {
  constructor() {}

  getStudent(): Student[] {
    return students;
  }
}

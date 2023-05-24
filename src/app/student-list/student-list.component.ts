import { Component, OnInit } from '@angular/core';
import { Student, students } from '../interfaces/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: Student[];

  constructor() {}

  ngOnInit() {
    this.students = students;
  }
}

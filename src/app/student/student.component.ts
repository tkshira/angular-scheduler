import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student, students } from '../interfaces/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  student?: Student;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));

    if (id) {
      students.map((student) => {
        if (student.id == id) {
          this.student = student
        }
      });
    }
  }
}

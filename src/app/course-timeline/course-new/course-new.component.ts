import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import { Course } from './../../interfaces/courses';
import { CourseService } from './../../services/course.service';
import { WeekDay, DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-new',
  templateUrl: './course-new.component.html',
  styleUrls: ['./course-new.component.css'],
})
export class CourseNewComponent implements OnChanges {
  courseForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    courseDate: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
  });

  @Input() course?: Course;

  @ViewChild('modalClose') modalCloseBtn: ElementRef;
  constructor(private courseService: CourseService, private dp: DatePipe) {}

  onSave() {
    console.log(this.courseForm.value.courseDate);
    let course: Course = {
      id: this.course.id,
      studentid: this.course.studentid,
      name: this.courseForm.value.name,
      day: new Date(this.courseForm.value.courseDate),
      startTime: new Date(`1970-01-01 ${this.courseForm.value.startTime}`),
      endTime: new Date(`1970-01-01 ${this.courseForm.value.endTime}`),
    };

    let courseObs;
    console.log(course.id);
    if (course.id) {
      courseObs = this.courseService.putCourse(course);
    } else {
      courseObs = this.courseService.postCourse(course);
    }
    if (courseObs) {
      courseObs.subscribe({
        next: () => this.modalCloseBtn.nativeElement.click(),
      });
    }
  }

  ngOnChanges() {
    if (this.course) {
      // console.log(formatDate(this.course.day, 'YYYY-mm-DD', undefined));
      console.log(this.dp.transform(this.course.day, 'yyyy-MM-dd'));
      this.courseForm.setValue({
        name: this.course.name,
        courseDate: this.dp.transform(this.course.day, 'yyyy-MM-dd'),
        startTime: this.course.startTime.toTimeString().slice(0, 5),
        endTime: this.course.endTime.toTimeString().slice(0, 5),
      });
    }
  }
}

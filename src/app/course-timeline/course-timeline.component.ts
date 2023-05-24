import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcademicDay, academicDays } from '../interfaces/academic-day';
import { Course, courses } from '../interfaces/courses';
import { defaultPeriod, Period } from '../interfaces/period';
import { CourseService } from '../services/course.service';

declare var bootstrap: any;

@Component({
  selector: 'app-course-timeline',
  templateUrl: './course-timeline.component.html',
  styleUrls: ['./course-timeline.component.css'],
})
export class CourseTimelineComponent implements OnInit, AfterViewInit {
  studentid?: number;
  courses?: Course[];
  days: AcademicDay[];
  periods: Period[];
  dragCourse?: Course;
  selCourse?: Course;
  currDragPos: number;
  maxPos: number;

  @ViewChild('newCourseModal') newCourseModal: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    console.log('timeline Init');
    this.days = academicDays;
    this.periods = defaultPeriod;
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.studentid = id;
      this.courses = courses.filter(
        (course) => course.studentid == this.studentid
      );
    }

    this.courseService.courseObservable.subscribe((courses) => {
      this.courses = courses;
      console.log(courses);
    });

    // this.newCourseModal.nativeElement.addEventListener(
    //   'hidden.bs.modal',
    //   (event) => {
    //     this.selCourse = undefined;
    //   }
    // );

    this.maxPos = this.periods.length * 50;
  }

  ngAfterViewInit() {
    // this.newCourseModal.nativeElement.onDismiss.subscribe(() =>
    //   console.log('hide')
    // );
    this.newCourseModal.nativeElement.addEventListener(
      'hidden.bs.modal',
      () => {
        this.selCourse = undefined;
      }
    );
  }

  canShowCourse(course: Course, day: AcademicDay): boolean {
    return course.day.toDateString() === day.date.toDateString();
  }

  onCourseClick(e: Course) {
    this.selCourse = e;
    console.log(e);
    setTimeout(() => {
      let modal = new bootstrap.Modal('#courseNew');

      modal.show();
    });
  }

  onAddCourse() {
    this.selCourse = {
      id: 0,
      studentid: this.studentid,
      name: '',
      day: new Date(),
      startTime: new Date(`1970-01-01 00:00`),
      endTime: new Date(`1970-01-01 00:00`),
    };

    setTimeout(() => {
      let modal = new bootstrap.Modal('#courseNew');

      modal.show();
    });
  }

  translateXY(course: Course) {
    if (course === this.dragCourse) {
      return '';
    }
    return `translate(${(course.day.getDay() - 1) * 0}px, ${
      (course.startTime.getHours() - 9) * 50
    }px)`;
  }

  calcTopPos(course: Course) {
    return (course.startTime.getHours() - 9) * 50;
    // return 50;
  }

  divHeight(course: Course) {
    return `${(course.endTime.getHours() - course.startTime.getHours()) * 50}`;
  }

  onDragStart(course: Course) {
    this.dragCourse = course;
  }

  onDragRelease(event, course: Course) {
    // console.log(event.dropPoint.y - event.container.element.nativeElement.offsetTop);
    let durationMin =
      (course.endTime.getTime() - course.startTime.getTime()) / 1000 / 60;
    let posY: number =
      event.dropPoint.y - event.container.element.nativeElement.offsetTop;
    posY = Math.min(Math.max(0, posY), this.maxPos);
    let startTime = ~~(posY / 50);
    course.day = new Date(
      event.container.element.nativeElement.dataset['daydate']
    );
    // course.startTime = new Date(`1970-01-01 0:00`).setHours(9 + startTime);
    course.startTime = new Date(1900, 0, 1, 9 + startTime);
    course.endTime = new Date(1900, 0, 1, 9 + startTime + ~~(durationMin / 60));
    console.log(startTime);
    this.dragCourse = undefined;
  }

  onDragMove(event) {
    let posY =
      event.pointerPosition.y -
      event.source.dropContainer.element.nativeElement.offsetTop;
    posY = Math.max(0, posY);
    posY = Math.min(this.maxPos, posY);
    this.currDragPos = ~~(posY / 50) * 50;
  }
}

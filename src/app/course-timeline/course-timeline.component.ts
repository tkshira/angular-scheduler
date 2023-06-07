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
import { Student, students } from '../interfaces/student';
import { CourseService } from '../services/course.service';
import { DatePipe } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-course-timeline',
  templateUrl: './course-timeline.component.html',
  styleUrls: ['./course-timeline.component.css'],
})
export class CourseTimelineComponent implements OnInit, AfterViewInit {
  studentid?: number;
  startDay: Date;
  endDay: Date;
  students: Student[];
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
    private courseService: CourseService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    console.log('timeline Init');
    this.students = students;
    this.startDay = new Date('2023/05/14');
    this.endDay = new Date('2023/05/20');
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

  getDateRangeName(): string {
    if (this.startDay.getMonth() === this.endDay.getMonth()) {
      return this.datePipe.transform(this.startDay, 'yyyy年MM月', 'ja-jp');
    } else {
      return `${this.datePipe.transform(
        this.startDay,
        'yyyy年MM月'
      )}～${this.datePipe.transform(this.endDay, 'yyyy年MM月')}`;
    }
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
      course.startTime.getHours() * 50
    }px)`;
  }

  calcTopPos(course: Course) {
    return course.startTime.getHours() * 50;
    // return 50;
  }

  divHeight(course: Course) {
    return (course.endTime.getHours() - course.startTime.getHours()) * 50;
  }

  getOverlapCourse(curCourse: Course): Course[]{
    return this.courses.filter((course) => {
      return ((course.day.toDateString() === curCourse.day.toDateString()) &&
        ((course.startTime < curCourse.startTime && course.endTime > curCourse.startTime)
         || (course.startTime < curCourse.endTime && course.endTime > curCourse.endTime )
         || (course.startTime === curCourse.startTime && course.endTime === curCourse.endTime)
         || (course.startTime <= curCourse.startTime && course.endTime >= curCourse.endTime)
         || (course.startTime >= curCourse.startTime && course.endTime <= curCourse.endTime)))
    })
  }

  divWidth(curCourse: Course) {
    const overlapCourse = this.getOverlapCourse(curCourse);
    if (overlapCourse.length){
      console.log(`divWidth = ${overlapCourse.length}`);
      return  (100 * 1 / overlapCourse.length) * 0.95;
    }
    return 95
  }

  divLeft(curCourse: Course) {
    const overlapCourse = this.getOverlapCourse(curCourse);

    if (overlapCourse.length){
      overlapCourse.sort((a, b) => {
        let result = a.startTime.getTime() - b.startTime.getTime()
        if (result){
          let result = a.endTime.getTime() - b.endTime.getTime()
          if (result){
            result = a.name > b.name ? -1 : 1
          }
        }
        return result
      })
      return (100 / overlapCourse.length) * overlapCourse.indexOf(curCourse)
      console.log(overlapCourse.indexOf(curCourse))
    }
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
    course.startTime = new Date(1900, 0, 1, startTime);
    course.endTime = new Date(1900, 0, 1, startTime + ~~(durationMin / 60));
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

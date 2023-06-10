import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, map, mergeMap, scheduled, asyncScheduler } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Course, courses } from '../interfaces/courses';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courseSource = new BehaviorSubject<Course[]>([]);
  courseObservable = this.courseSource.asObservable();

  constructor(private http: HttpClient) {
    this.courseSource.next(courses);
  }

  getCourses(): Observable<Course[]> {
    return of(courses);
    // return scheduled(courses, asyncScheduler);
  }

  getCoursesByStudentId(studentid: number): Observable<Course[]> {
    return of(courses.filter((course) => (course.studentid = studentid)));
  }

  postCourse(course: Course): Observable<Course> {
    course.id = courses.length + 1;
    courses.push(course);

    console.log(courses);
    return of(course);
  }

  putCourse(course: Course): Observable<Course> {
    let index = courses.findIndex((item) => course.id === item.id);
    if (!index){
      return of();
    }
    courses.splice(index, 1, course);
    return of(course).pipe(
      finalize(() => {
        this.courseSource.next(courses);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, tap, scheduled, asyncScheduler } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { Course, courses } from '../interfaces/courses';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courseSource = new BehaviorSubject<Course[]>([]);
  courseObservable = this.courseSource.asObservable();

  constructor(private http: HttpClient) {
    // this.courseSource.next(courses);
  }

  loadcourses(id: string, date: Date){
    this.getCourses(id, date).subscribe(
      courses => this.courseSource.next(courses)
    );
  }

  getCourses(id: string, date: Date): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.apiURL}/courses/${id}/${date.toISOString()}`).pipe(
      map((courses) => {
        return courses.map((course) => {
          course.day = new Date(course.day);
          course.startTime = new Date(course.startTime);
          course.endTime = new Date(course.endTime);
          return course
        })
      })
    );
    // return of(courses);
    // return scheduled(courses, asyncScheduler);
  }

  getCoursesByStudentId(studentid: number): Observable<Course[]> {
    return of(courses.filter((course) => (course.studentid = studentid)));
  }

  postCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${environment.apiURL}/courses`, course).pipe(
      tap({
        next: (() => {
          console.log(`${course}`)
          this.courseSource.value.push(course);
          this.courseSource.next(this.courseSource.value)
        }),
        error: () => console.log('Error')
      })
    )
    // course.id = courses.length + 1;
    // courses.push(course);

    // console.log(courses);
    // return of(course);
  }

  putCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${environment.apiURL}/courses`, course).pipe(
      tap({
        next: (() => {
          this.courseSource.next([...this.courseSource.value.filter((cr) => cr._id !== course._id), course]);
        }),
        error: () => console.log('Error')
      })
    )
    //   // return this.http.put<Course[]>(`${environment.apiURL}/api/nippou/put`)
    // let index = courses.findIndex((item) => course._id === item._id);
    // if (!index){
    //   return of();
    // }
    // courses.splice(index, 1, course);
    // return of(course).pipe(
    //   finalize(() => {
    //     this.courseSource.next(courses);
    //   })
    // );
  }
}

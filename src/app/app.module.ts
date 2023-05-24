import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentComponent } from './student/student.component';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CourseTimelineComponent } from './course-timeline/course-timeline.component';
import { CourseNewComponent } from './course-timeline/course-new/course-new.component';

import { CourseService } from './services/course.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: StudentListComponent },
      { path: 'student/:id', component: StudentComponent },
      { path: 'courses/:id', component: CourseTimelineComponent },
    ]),
    MatCardModule,
    DragDropModule,
  ],
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentComponent,
    CourseTimelineComponent,
    CourseNewComponent,
  ],
  bootstrap: [AppComponent],
  providers: [DatePipe],
})
export class AppModule {}

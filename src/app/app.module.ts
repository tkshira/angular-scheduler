import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentComponent } from './student/student.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CourseTimelineComponent } from './course-timeline/course-timeline.component';
import { CourseNewComponent } from './course-timeline/course-new/course-new.component';
import { CourseService } from './services/course.service';

import localeJp from '@angular/common/locales/ja';
import { LoginComponent } from './login/login.component';
registerLocaleData(localeJp);

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'student', component: StudentListComponent },
      { path: 'student/:id', component: StudentComponent },
      { path: 'courses/:id', component: CourseTimelineComponent },
    ]),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentComponent,
    CourseTimelineComponent,
    CourseNewComponent,
    LoginComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    DatePipe,
    {
      provide: LOCALE_ID,
      useValue: 'ja',
    },
  ],
})
export class AppModule {}

import { Time, WeekDay } from '@angular/common';

export interface Course {
  id: number;
  studentid: number;
  day: Date;
  name: string;
  startTime: Date;
  endTime: Date;
}

export const courses: Course[] = [
  {
    id: 1,
    studentid: 1,
    name: 'Math',
    day: new Date(2023, 4, 15),
    startTime: new Date(0, 1, 1, 9, 0),
    endTime: new Date(0, 1, 1, 10, 0),
  },
  {
    id: 2,
    studentid: 1,
    name: 'Sciences',
    day: new Date(2023, 4, 15),
    startTime: new Date(0, 1, 1, 10, 0),
    endTime: new Date(0, 1, 1, 11, 0),
  },
  {
    id: 3,
    studentid: 1,
    name: 'Math',
    day: new Date(2023, 4, 16),
    startTime: new Date(0, 1, 1, 11, 0),
    endTime: new Date(0, 1, 1, 12, 0),
  },
  {
    id: 4,
    studentid: 1,
    name: 'Sciences',
    day: new Date(2023, 4, 16),
    startTime: new Date(0, 1, 1, 12, 0),
    endTime: new Date(0, 1, 1, 13, 0),
  },
  {
    id: 5,
    studentid: 1,
    name: 'Geography',
    day: new Date(2023, 4, 16),
    startTime: new Date(0, 1, 1, 9, 0),
    endTime: new Date(0, 1, 1, 11, 0),
  },
];

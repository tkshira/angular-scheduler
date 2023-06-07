import { defaultPeriod, Period } from './period';

export interface AcademicDay {
  date: Date;
  period: Period[];
}

export const academicDays: AcademicDay[] = [
  {
    date: new Date('2023/05/14'),
    period: defaultPeriod,
  },
  {
    date: new Date('2023/05/15'),
    period: defaultPeriod,
  },
  {
    date: new Date('2023/05/16'),
    period: defaultPeriod,
  },
  {
    date: new Date('2023/05/17'),
    period: defaultPeriod,
  },
  {
    date: new Date('2023/05/18'),
    period: defaultPeriod,
  },
  {
    date: new Date('2023/05/19'),
    period: defaultPeriod,
  },
  {
    date: new Date('2023/05/20'),
    period: defaultPeriod,
  },
];

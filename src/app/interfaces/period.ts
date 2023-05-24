import { Time } from '@angular/common';

export interface Period {
  starttime: Time;
  endtime: Time;
}

export const defaultPeriod: Period[] = [
  {
    starttime: { hours: 9, minutes: 0 },
    endtime: { hours: 10, minutes: 0 },
  },
  {
    starttime: { hours: 10, minutes: 0 },
    endtime: { hours: 11, minutes: 0 },
  },
  {
    starttime: { hours: 11, minutes: 0 },
    endtime: { hours: 12, minutes: 0 },
  },
  {
    starttime: { hours: 12, minutes: 0 },
    endtime: { hours: 13, minutes: 0 },
  },
  {
    starttime: { hours: 13, minutes: 0 },
    endtime: { hours: 14, minutes: 0 },
  },
  {
    starttime: { hours: 14, minutes: 0 },
    endtime: { hours: 15, minutes: 0 },
  },
  {
    starttime: { hours: 15, minutes: 0 },
    endtime: { hours: 16, minutes: 0 },
  },
  {
    starttime: { hours: 16, minutes: 0 },
    endtime: { hours: 17, minutes: 0 },
  },
  {
    starttime: { hours: 17, minutes: 0 },
    endtime: { hours: 18, minutes: 0 },
  },
];

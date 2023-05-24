export interface Student {
  id: number;
  name: string;
  birthdate: Date;
}

export const students: Student[] = [
  {
    id: 1,
    name: 'John Doe',
    birthdate: new Date('1988/10/16'),
  },
  {
    id: 2,
    name: 'Mary Doe',
    birthdate: new Date('1988 / 12 / 16'),
  },
  {
    id: 3,
    name: 'Marina Doe',
    birthdate: new Date('2020 / 12 / 16'),
  },
  {
    id: 4,
    name: 'Andre Doe',
    birthdate: new Date('2020 / 12 / 16'),
  },
  {
    id: 5,
    name: 'Takeshi Doe',
    birthdate: new Date('2020 / 12 / 16'),
  },
  {
    id: 6,
    name: 'Thamiris Doe',
    birthdate: new Date('2020 / 12 / 16'),
  },
  {
    id: 7,
    name: 'Tiemy Doe',
    birthdate: new Date('2020 / 12 / 16'),
  },
  {
    id: 8,
    name: 'Kaede Doe',
    birthdate: new Date('2020 / 12 / 16'),
  },
];

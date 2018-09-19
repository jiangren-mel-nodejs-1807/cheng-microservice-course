import { Entity, model, property, hasMany } from '@loopback/repository';
import { StudentRef } from './student-ref.model';

@model()
export class Course extends Entity {

  @property({
    type: 'string',
    required: true,
    default: '',

  })
  name: string;

  @property({
    type: 'number',
    id: true,

  })
  id?: number;

  @property({
    type: 'string',

  })
  description?: string;

  @hasMany(StudentRef)
  students?: StudentRef[];

  constructor(data?: Partial<Course>) {
    super(data);
  }
}

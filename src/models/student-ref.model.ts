import { Entity, model, property } from '@loopback/repository';

@model()
export class StudentRef extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  href?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property()
  courseId: number;

  constructor(data?: Partial<StudentRef>) {
    super(data);
  }
}

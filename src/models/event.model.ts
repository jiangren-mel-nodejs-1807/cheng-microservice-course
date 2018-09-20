import {Entity, model, property} from '@loopback/repository';

@model()
export class Event extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'object',
  })
  payload?: object;

  constructor(data?: Partial<Event>) {
    super(data);
  }
}

import {Entity, model, property} from '@loopback/repository';

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
  
  constructor(data?: Partial<Course>) {
    super(data);
  }
}

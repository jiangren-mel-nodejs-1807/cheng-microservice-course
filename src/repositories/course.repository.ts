import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Course } from '../models';
import { inject } from '@loopback/core';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.id
  > {
  constructor(@inject('datasources.memory') protected datasource: juggler.DataSource) {
    super(Course, datasource);
  }
}

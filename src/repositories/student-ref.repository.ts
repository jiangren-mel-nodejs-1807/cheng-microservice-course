import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { StudentRef } from '../models';
import { inject } from '@loopback/core';

export class StudentRefRepository extends DefaultCrudRepository<
  StudentRef,
  typeof StudentRef.prototype.id
  > {
  constructor(@inject('datasources.memory') protected datasource: juggler.DataSource) {
    super(StudentRef, datasource);
  }
}

import { DefaultCrudRepository, juggler, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { Course, StudentRef } from '../models';
import { StudentRefRepository } from './student-ref.repository';
import { inject } from '@loopback/core';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.id
  > {
  public students: HasManyRepositoryFactory<StudentRef, typeof Course.prototype.id>;

  constructor(
    @inject('datasources.memory') protected datasource: juggler.DataSource,
    @repository(StudentRefRepository) protected studentRefRepository: StudentRefRepository
  ) {
    super(Course, datasource);
    this.students = this._createHasManyRepositoryFactoryFor(
      'students',
      studentRefRepository
    );
  }
}

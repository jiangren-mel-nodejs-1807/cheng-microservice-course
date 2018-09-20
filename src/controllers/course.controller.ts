import { Filter, Where, repository } from '@loopback/repository';
import {
  post,
  param,
  get,
  patch,
  del,
  requestBody,
  HttpErrors
} from '@loopback/rest';
import { Course, StudentRef, Event } from '../models';
import { CourseRepository, StudentRefRepository } from '../repositories';

export class CourseController {
  constructor(
    @repository(CourseRepository)
    public courseRepository: CourseRepository,
    @repository(StudentRefRepository)
    public studentRefRepository: StudentRefRepository,
  ) { }

  @post('/courses')
  async create(@requestBody() obj: Course)
    : Promise<Course> {
    return await this.courseRepository.create(obj);
  }

  @get('/courses/count')
  async count(@param.query.string('where') where?: Where): Promise<number> {
    return await this.courseRepository.count(where);
  }

  @get('/courses')
  async find(@param.query.string('filter') filter?: Filter)
    : Promise<Course[]> {
    return await this.courseRepository.find(filter);
  }

  @patch('/courses')
  async updateAll(
    @requestBody() obj: Course,
    @param.query.string('where') where?: Where
  ): Promise<number> {
    return await this.courseRepository.updateAll(obj, where);
  }

  @del('/courses')
  async deleteAll(@param.query.string('where') where?: Where): Promise<number> {
    return await this.courseRepository.deleteAll(where);
  }

  @get('/courses/{id}')
  async findById(@param.path.number('id') id: number): Promise<Course> {
    return await this.courseRepository.findById(id);
  }

  @patch('/courses/{id}')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() obj: Course
  ): Promise<boolean> {
    return await this.courseRepository.updateById(id, obj);
  }

  @del('/courses/{id}')
  async deleteById(@param.path.number('id') id: number): Promise<boolean> {
    return await this.courseRepository.deleteById(id);
  }

  @post('/courses/{id}/enrol')
  async enrol(@param.path.number('id') id: number, @requestBody() obj: StudentRef)
    : Promise<Course> {
    let existedStudents = await this.courseRepository.students(id).find({
      where: {
        id: obj.id
      }
    });
    if (existedStudents.length === 0) {
      return await this.courseRepository.students(id).create(obj);
    }
    throw new HttpErrors.BadRequest(`This student has already enrolled.`);
  }

  @get('/courses/{id}/students')
  async findStudents(
    @param.path.number('id') id: number,
    @param.query.string('filter') filter?: Filter
  ): Promise<StudentRef[]> {
    return await this.courseRepository.students(id).find(filter);
  }

  @post('/courses/client/listener')
  async callback(@requestBody() obj: Event): Promise<any> {
    let newStudent = obj.payload as StudentRef;
    if (obj.type === 'StudentUpdateNotification') {
      let foundedRecords = await this.studentRefRepository.find({
        where: { studentId: newStudent.studentId }
      });
      console.log(`found ${foundedRecords.length}`);
      for (let i = 0; i < foundedRecords.length; i++) {
        let aStudent = foundedRecords[i];
        let success = await this.studentRefRepository.updateById(aStudent.id, newStudent);
        console.log(`${aStudent.studentId} ${success}`);
      }
      // let updatedRecords = await this.studentRefRepository.updateAll(newStudent, {
      //   where: { studentId: newStudent.studentId }
      // });
      // if (updatedRecords > 0) {
      //   return `${updatedRecords} records had been updated`;
      // }
    }
    throw new HttpErrors.BadRequest(`No records updated`);
  }
}

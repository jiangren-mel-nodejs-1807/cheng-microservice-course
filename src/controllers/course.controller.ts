import { Filter, Where, repository } from '@loopback/repository';
import {
  post,
  param,
  get,
  patch,
  del,
  requestBody
} from '@loopback/rest';
import { Course } from '../models';
import { CourseRepository } from '../repositories';

export class CourseController {
  constructor(
    @repository(CourseRepository)
    public courseRepository: CourseRepository,
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
}

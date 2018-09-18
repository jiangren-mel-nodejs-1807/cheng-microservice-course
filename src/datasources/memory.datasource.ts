import { inject } from '@loopback/core';
import { juggler, AnyObject } from '@loopback/repository';
const config = require('./memory.datasource.json');

export class MemoryDataSource extends juggler.DataSource {
  static dataSourceName = 'memory';

  constructor(
    @inject('datasources.config.memory', { optional: true })
    dsConfig: AnyObject = config
  ) {
    super(dsConfig);
  }
}

import {ChengMicroserviceCourseApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {ChengMicroserviceCourseApplication};

export async function main(options?: ApplicationConfig) {
  const app = new ChengMicroserviceCourseApplication(options);
  await app.boot();
  await app.start();
  return app;
}

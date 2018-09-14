import * as fs from 'fs';
import { ChengMicroserviceCourseApplication } from './application';
import { ApplicationConfig } from '@loopback/core';

export { ChengMicroserviceCourseApplication };

export async function main(options?: ApplicationConfig) {
  const httpsOptions = {
    rest: {
      protocol: 'https',
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem'),
    },
  };
  const app = new ChengMicroserviceCourseApplication(httpsOptions);
  await app.boot();
  await app.start();
  return app;
}

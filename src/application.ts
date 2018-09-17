import { ApplicationConfig } from '@loopback/core';
import { RestApplication, RestServer } from '@loopback/rest';
import { MySequence } from './sequence';

/* tslint:disable:no-unused-variable */
// Binding and Booter imports are required to infer types for BootMixin!
import { BootMixin } from '@loopback/boot';
/* tslint:enable:no-unused-variable */
import { RepositoryMixin } from '@loopback/repository';

export class ChengMicroserviceCourseApplication extends BootMixin(
  RepositoryMixin(RestApplication)
) {
  constructor(options?: ApplicationConfig) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  async start() {
    await super.start();

    const server = await this.getServer(RestServer);
    const swaggerConsole = 'https://loopback.io/api-explorer/?url=' + server.url + '/openapi.json';
    console.log(`Https Server is running at ${server.url}`);
    console.log(`Try ${server.url}/ping`);
    console.log(`Swagger console is running at ${swaggerConsole}`);
  }
}

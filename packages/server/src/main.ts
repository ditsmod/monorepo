import 'reflect-metadata';
require('dotenv').config();
import { Application } from '@ditsmod/core';

import { AppModule } from './app/app.module';

new Application().bootstrap(AppModule).catch((err) => {
  console.log(err);
});

import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import { ServerOptions } from 'node:http';
import { Application } from '@ditsmod/core';

import { AppModule } from './app/app.module.js';
import { checkCliAndSetPort } from './app/utils/check-cli-and-set-port.js';

const numCpus = availableParallelism();

if (process.env.NODE_ENV == 'production' && numCpus > 1 && cluster.isPrimary) {
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }
} else {
  const serverOptions: ServerOptions = { keepAlive: true, keepAliveTimeout: 5 };
  const app = await new Application().bootstrap(AppModule, { serverOptions });
  const port = checkCliAndSetPort(3000);
  app.server.listen(port, '0.0.0.0');
}


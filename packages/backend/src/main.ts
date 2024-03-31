import { ServerOptions } from 'node:http';
import { Application } from '@ditsmod/core';

import { AppModule } from './app/app.module.js';
import { checkCliAndSetPort } from './app/utils/check-cli-and-set-port.js';

const serverOptions: ServerOptions = { keepAlive: true, keepAliveTimeout: 5000 };
const app = await new Application().bootstrap(AppModule, { serverOptions });
const port = checkCliAndSetPort(3000);
app.server.listen(port, '0.0.0.0');

import * as http from 'http';
import { ControllerErrorHandler, Logger, LoggerConfig, RootModule } from '@ditsmod/core';
import { RouterModule } from '@ditsmod/router';
import { BodyParserModule } from '@ditsmod/body-parser';
import { ValidationModule } from '@ditsmod/openapi-validation';

import { ErrorHandlerModule } from '@service/error-handler/error-handler.module';
import { UtilModule } from '@service/util/util.module';
import { ConfigModule } from '@service/app-config/config.module';
import { AuthModule } from '@service/auth/auth.module';
import { DemoModule } from '@routed/demo/demo.module';
import { getPort } from '@utils/get-port';
import { openapiModuleWithParams } from '@service/openapi-with-params';
import { LoggerModule } from '@service/logger/logger.module';
import { BasicGuard } from '@service/auth/basic.guard';

const loggerConfig = new LoggerConfig('info');

@RootModule({
  httpModule: http,
  serverOptions: {},
  listenOptions: { port: getPort(3000), host: 'localhost' },
  path: 'api',
  imports: [
    { path: 'demo', module: DemoModule },
    RouterModule,
    AuthModule,
    ValidationModule,
    ErrorHandlerModule,
    ConfigModule,
    UtilModule,
    BodyParserModule,
    openapiModuleWithParams,
    LoggerModule
  ],
  controllers: [],
  providersPerApp: [
    { provide: LoggerConfig, useValue: loggerConfig },
  ],
  providersPerReq: [BasicGuard],
  resolvedCollisionsPerApp: [
    [Logger, LoggerModule]
  ],
  resolvedCollisionsPerReq: [
    [ControllerErrorHandler, ErrorHandlerModule],
  ],
  exports: [
    BasicGuard,
    AuthModule,
    ValidationModule,
    ErrorHandlerModule,
    UtilModule,
    BodyParserModule,
    openapiModuleWithParams,
  ],
})
export class AppModule {}

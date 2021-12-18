import * as http from 'http';
import { ControllerErrorHandler, Logger, LoggerConfig, RootModule } from '@ditsmod/core';
import { RouterModule } from '@ditsmod/router';
import { OpenapiModule } from '@ditsmod/openapi';
import { SessionCookieOptions } from '@ditsmod/session-cookie';

import { MysqlModule } from '@service/mysql/mysql.module';
import { ValidationModule } from '@service/validation/validation.module';
import { ErrorHandlerModule } from '@service/error-handler/error-handler.module';
import { CryptoModule } from '@service/crypto/crypto.module';
import { UtilModule } from '@service/util/util.module';
import { BodyParserModule } from '@ditsmod/body-parser';
import { LoggerModule } from '@service/logger/logger.module';
import { ConfigModule } from '@service/config/config.module';
import { MsgModule } from '@service/msg/msg.module';
import { oasObject } from './oas-object';

const openapiModuleWithParams = OpenapiModule.withParams(oasObject);

@RootModule({
  httpModule: http,
  serverName: 'Node.js',
  serverOptions: {},
  listenOptions: { port: 3000, host: 'localhost' },
  prefixPerApp: 'api',
  imports: [RouterModule, MysqlModule, openapiModuleWithParams, LoggerModule, ConfigModule, MsgModule],
  controllers: [],
  resolvedCollisionsPerApp: [[Logger, LoggerModule], [LoggerConfig, LoggerModule]],
  resolvedCollisionsPerReq: [[ControllerErrorHandler, ErrorHandlerModule]],
  exports: [ValidationModule, openapiModuleWithParams, ErrorHandlerModule, CryptoModule, UtilModule, BodyParserModule],
})
export class AppModule {}

import { Logger, LoggerConfig, Module } from '@ditsmod/core';
import { LoggerOptions1 } from '@ditsmod/logger/dist/types';

import { LoggerService } from './logger.service';
import { LoggerOptionsToken } from './types';

const loggerConfig = new LoggerConfig();
const level: keyof Logger = 'info';
loggerConfig.level = level;

@Module({
  providersPerApp: [
    { provide: Logger, useClass: LoggerService },
    { provide: LoggerConfig, useValue: loggerConfig },
    { provide: LoggerOptionsToken, useValue: { name: 'ditsmod-logs' } as LoggerOptions1 },
  ],
})
export class LoggerModule {}

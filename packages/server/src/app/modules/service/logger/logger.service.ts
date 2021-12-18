import { Logger as BunyanLogger, LoggerOptions } from '@ditsmod/logger';
import { Injectable, Inject } from '@ts-stack/di';

import { LoggerOptionsToken } from './types';

@Injectable()
export class LoggerService extends BunyanLogger {
  constructor(@Inject(LoggerOptionsToken) optiions: LoggerOptions) {
    super(optiions);
  }
}

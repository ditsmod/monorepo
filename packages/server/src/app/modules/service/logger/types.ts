import { InjectionToken } from '@ts-stack/di';
import { LoggerOptions } from '@ditsmod/logger';

export const LoggerOptionsToken = new InjectionToken<LoggerOptions>('LoggerOptionsToken');
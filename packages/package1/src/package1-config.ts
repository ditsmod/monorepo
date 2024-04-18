import { InjectionToken } from '@ditsmod/core';

/**
 * It is used as a DI token.
 */
export const PACKAGE1_TOKEN = new InjectionToken<any>('PACKAGE1_TOKEN');

export class Package1Config {
  one = 1;
  two = 2;
}

import { HttpHandler, HttpInterceptor, Injector, RequestContext, injectable } from '@ditsmod/core';

import { PACKAGE1_TOKEN } from './package1-config.js';

@injectable()
export class Package1Interceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  async intercept(next: HttpHandler, ctx: RequestContext) {
    // Some processing
    // ...
    const value = 'some-value';
    this.injector.setByToken(PACKAGE1_TOKEN, value);

    return next.handle();
  }
}

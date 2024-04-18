import { HttpHandler, HttpInterceptor, SingletonRequestContext, injectable } from '@ditsmod/core';

interface ExtendedContext extends SingletonRequestContext {
  someProperty: any;
}

@injectable()
export class SingletonPackage1Interceptor implements HttpInterceptor {
  async intercept(next: HttpHandler, ctx: ExtendedContext) {
    // Some processing
    // ...
    ctx.someProperty = 'some-value';

    return next.handle();
  }
}

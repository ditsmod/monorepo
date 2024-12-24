import { controller, RequestContext, SingletonRequestContext } from '@ditsmod/core';
import { route } from '@ditsmod/routing';

@controller({ scope: 'module' })
export class SingletonController {
  @route('GET', 'hello2')
  tellHello(ctx: RequestContext) {
    ctx.send('Hello World!');
  }

  @route('POST', 'body2')
  postHello(ctx: SingletonRequestContext) {
    ctx.sendJson(ctx.body);
  }

  @route('GET', 'throw-error2')
  thrwoError() {
    throw new Error('Here some error occurred');
  }
}

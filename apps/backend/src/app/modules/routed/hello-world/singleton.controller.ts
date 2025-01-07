import { controller, RequestContext } from '@ditsmod/core';
import { route } from '@ditsmod/routing';

@controller({ scope: 'ctx' })
export class CtxScopedController {
  @route('GET', 'hello2')
  tellHello(ctx: RequestContext) {
    ctx.send('Hello World!');
  }

  @route('POST', 'body2')
  postHello(ctx: RequestContext) {
    ctx.sendJson(ctx.body);
  }

  @route('GET', 'throw-error2')
  thrwoError() {
    throw new Error('Here some error occurred');
  }
}

import { controller, RequestContext, Res, route } from '@ditsmod/core';

@controller()
export class SomeController {
  @route('GET', 'hello')
  ok(res: Res) {
    res.send('Hello World!');
  }
}

@controller({ isSingleton: true })
export class SingletonController {
  @route('GET', 'hello2')
  tellHello(ctx: RequestContext) {
    ctx.nodeRes.setHeader('Content-Type', 'text/plain; charset=utf-8');
    ctx.nodeRes.end('Hello World!');
  }
}

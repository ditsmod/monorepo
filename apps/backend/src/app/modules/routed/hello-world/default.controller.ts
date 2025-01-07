import { HTTP_BODY } from '@ditsmod/body-parser';
import { controller, inject, Res } from '@ditsmod/core';
import { route } from '@ditsmod/routing';

@controller()
export class InjScopedController {
  @route('GET', 'hello')
  tellHello(res: Res) {
    res.send('Hello World!');
  }

  @route('POST', 'body')
  postHello(res: Res, @inject(HTTP_BODY) body: any) {
    res.sendJson(body);
  }

  @route('GET', 'throw-error')
  thrwoError() {
    throw new Error('Here some error occurred');
  }
}

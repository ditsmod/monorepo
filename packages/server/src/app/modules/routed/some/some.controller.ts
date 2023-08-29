import { controller, Res, route } from '@ditsmod/core';

@controller()
export class SomeController {
  @route('GET')
  ok(res: Res) {
    res.send('Hello World!');
  }
}

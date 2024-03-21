import { Injector, Res } from '@ditsmod/core';
import { jest } from '@jest/globals';

import { SomeController } from './some.controller.js';

describe('SomeController', () => {
  const send = jest.fn();
  const res = { send } as unknown as Res;
  let someController: SomeController;

  beforeEach(() => {
    send.mockRestore();
    const injector = Injector.resolveAndCreate([SomeController]);
    someController = injector.get(SomeController);
  });

  it('should say "Hello World!"', () => {
    expect(() => someController.ok(res)).not.toThrow();
    expect(send).toHaveBeenCalledWith('Hello World!');
    expect(send).toHaveBeenCalledTimes(1);
  });
});

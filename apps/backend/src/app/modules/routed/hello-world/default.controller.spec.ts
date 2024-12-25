import { Injector, Res } from '@ditsmod/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DefaultController } from './default.controller.js';

describe('DefaultController', () => {
  const send = vi.fn();
  const sendJson = vi.fn();
  const res = { send, sendJson } as unknown as Res;
  let defaultController: DefaultController;

  beforeEach(() => {
    send.mockRestore();
    sendJson.mockRestore();

    const injector = Injector.resolveAndCreate([
      DefaultController,
      { token: Res, useValue: res }
    ]);

    defaultController = injector.get(DefaultController);
  });

  it('should say "Hello World!"', () => {
    expect(() => defaultController.tellHello(res)).not.toThrow();
    expect(send).toHaveBeenCalledWith('Hello World!');
    expect(send).toHaveBeenCalledTimes(1);
    expect(sendJson).toHaveBeenCalledTimes(0);
  });

  it('should send post body back', () => {
    const postBody = {};
    expect(() => defaultController.postHello(res, postBody)).not.toThrow();
    expect(sendJson).toHaveBeenCalledWith(postBody);
    expect(send).toHaveBeenCalledTimes(0);
    expect(sendJson).toHaveBeenCalledTimes(1);
  });

  it('should throw an error', () => {
    expect(() => defaultController.thrwoError()).toThrow('Here some error occurred');
    expect(send).toHaveBeenCalledTimes(0);
    expect(sendJson).toHaveBeenCalledTimes(0);
  });
});

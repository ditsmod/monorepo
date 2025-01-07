import { Injector, Res } from '@ditsmod/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { InjScopedController } from './default.controller.js';

describe('InjScopedController', () => {
  const send = vi.fn();
  const sendJson = vi.fn();
  const res = { send, sendJson } as unknown as Res;
  let injScopedController: InjScopedController;

  beforeEach(() => {
    send.mockRestore();
    sendJson.mockRestore();

    const injector = Injector.resolveAndCreate([
      InjScopedController,
      { token: Res, useValue: res }
    ]);

    injScopedController = injector.get(InjScopedController);
  });

  it('should say "Hello World!"', () => {
    expect(() => injScopedController.tellHello(res)).not.toThrow();
    expect(send).toHaveBeenCalledWith('Hello World!');
    expect(send).toHaveBeenCalledTimes(1);
    expect(sendJson).toHaveBeenCalledTimes(0);
  });

  it('should send post body back', () => {
    const postBody = {};
    expect(() => injScopedController.postHello(res, postBody)).not.toThrow();
    expect(sendJson).toHaveBeenCalledWith(postBody);
    expect(send).toHaveBeenCalledTimes(0);
    expect(sendJson).toHaveBeenCalledTimes(1);
  });

  it('should throw an error', () => {
    expect(() => injScopedController.thrwoError()).toThrow('Here some error occurred');
    expect(send).toHaveBeenCalledTimes(0);
    expect(sendJson).toHaveBeenCalledTimes(0);
  });
});

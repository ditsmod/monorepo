import 'reflect-metadata';
import { Logger, Res, Status } from '@ditsmod/core';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import { ReflectiveInjector } from '@ts-stack/di';

import { CustomError, ErrorOpts } from '@service/error-handler/custom-error';
import { ErrorHandler } from '@service/error-handler/error-handler';

describe('ErrorHandler', () => {
  type ErrorLog = ErrorOpts & { err?: any };
  let errorHandler: ErrorHandler;

  const res = {
    nodeRes: {
      headersSent: false,
    },
    sendJson(...args: any[]) {},
  } as Res;

  const logger = {
    log(...args: any[]) {},
    error(...args: any[]) {},
  } as Logger;

  beforeEach(() => {
    const injector = ReflectiveInjector.resolveAndCreate([
      { provide: Res, useValue: res },
      { provide: Logger, useValue: logger },
      ErrorHandler,
    ]);

    errorHandler = injector.get(ErrorHandler);

    jest.spyOn(res, 'sendJson');
    jest.spyOn(logger, 'log');
    jest.spyOn(logger, 'error');
  });

  afterEach(jest.restoreAllMocks);

  it('default error with some message', () => {
    const err = new Error('one');
    expect(() => errorHandler.handleError(err)).not.toThrow();
    expect(res.sendJson).toBeCalledWith({ error: 'Internal server error' }, Status.INTERNAL_SERVER_ERROR);
    const log: ErrorLog = { err: expect.anything() };
    expect(logger.error).toBeCalledWith(expect.objectContaining(log as any));
    expect(res.sendJson).toBeCalledTimes(1);
    expect(logger.log).toBeCalledTimes(0);
    expect(logger.error).toBeCalledTimes(1);
  });

  it('custom error with msg1', () => {
    const msg1 = 'one';
    const err = new CustomError({ msg1 });
    expect(() => errorHandler.handleError(err)).not.toThrow();
    expect(res.sendJson).toBeCalledWith({ error: 'one' }, Status.BAD_REQUEST);
    const log: ErrorLog = { msg1: 'one', msg2: '', status: Status.BAD_REQUEST, err: expect.anything() };
    expect(logger.log).toBeCalledWith('debug', expect.objectContaining(log as any));
    expect(res.sendJson).toBeCalledTimes(1);
    expect(logger.log).toBeCalledTimes(1);
    expect(logger.error).toBeCalledTimes(0);
  });

  it('custom error with status and level changed', () => {
    const msg1 = 'one';
    const err = new CustomError({ msg1, status: Status.CONFLICT, level: 'fatal' });
    expect(() => errorHandler.handleError(err)).not.toThrow();
    expect(res.sendJson).toBeCalledWith({ error: 'one' }, Status.CONFLICT);
    const log: ErrorLog = { msg1: 'one', msg2: '', status: Status.CONFLICT, err: expect.anything() };
    expect(logger.log).toBeCalledWith('fatal', expect.objectContaining(log as any));
    expect(res.sendJson).toBeCalledTimes(1);
    expect(logger.log).toBeCalledTimes(1);
    expect(logger.error).toBeCalledTimes(0);
  });

  it('custom error with msg1 and arguments for format', () => {
    const msg1 = 'one %s three';
    const args1 = ['param1', 'two'];
    const err = new CustomError({ msg1, args1 });
    expect(() => errorHandler.handleError(err)).not.toThrow();
    expect(res.sendJson).toBeCalledWith({ param1: 'one two three' }, Status.BAD_REQUEST);
    const log: ErrorLog = { msg1, args1, msg2: '', status: Status.BAD_REQUEST, err: expect.anything() };
    expect(logger.log).toBeCalledWith('debug', expect.objectContaining(log as any));
    expect(res.sendJson).toBeCalledTimes(1);
    expect(logger.log).toBeCalledTimes(1);
    expect(logger.error).toBeCalledTimes(0);
  });

  it('custom error with msg2', () => {
    const msg2 = 'one';
    const err = new CustomError({ msg2 });
    expect(() => errorHandler.handleError(err)).not.toThrow();
    expect(res.sendJson).toBeCalledWith({ error: 'Internal server error' }, Status.BAD_REQUEST);
    const log: ErrorLog = { msg1: 'Internal server error', msg2, status: Status.BAD_REQUEST, err: expect.anything() };
    expect(logger.log).toBeCalledWith('debug', expect.objectContaining(log as any));
    expect(res.sendJson).toBeCalledTimes(1);
    expect(logger.log).toBeCalledTimes(1);
    expect(logger.error).toBeCalledTimes(0);
  });

  it('custom error with msg2 and arguments for format', () => {
    const msg2 = 'one %s three';
    const args2 = ['param1', 'two'];
    const err = new CustomError({ msg2, args2 });
    expect(() => errorHandler.handleError(err)).not.toThrow();
    expect(res.sendJson).toBeCalledWith({ error: 'Internal server error' }, Status.BAD_REQUEST);
    const log: ErrorLog = {
      msg1: 'Internal server error',
      msg2,
      args2,
      status: Status.BAD_REQUEST,
      err: expect.anything(),
    };
    expect(logger.log).toBeCalledWith('debug', expect.objectContaining(log as any));
    expect(res.sendJson).toBeCalledTimes(1);
    expect(logger.log).toBeCalledTimes(1);
    expect(logger.error).toBeCalledTimes(0);
  });

  it('custom error with msg1, msg2 and arguments for format', () => {
    const msg1 = 'one %s three';
    const args1 = ['param1', 'two'];
    const msg2 = 'four %s six';
    const args2 = ['param2', 'five'];
    const err = new CustomError({ msg1, args1, msg2, args2 });
    expect(() => errorHandler.handleError(err)).not.toThrow();
    expect(res.sendJson).toBeCalledWith({ param1: 'one two three' }, Status.BAD_REQUEST);
    const log: ErrorLog = { msg1, args1, msg2, args2, status: Status.BAD_REQUEST, err: expect.anything() };
    expect(logger.log).toBeCalledWith('debug', expect.objectContaining(log as any));
    expect(res.sendJson).toBeCalledTimes(1);
    expect(logger.log).toBeCalledTimes(1);
    expect(logger.error).toBeCalledTimes(0);
  });
});

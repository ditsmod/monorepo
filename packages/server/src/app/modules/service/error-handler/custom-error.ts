import { ChainError } from '@ts-stack/chain-error';
import { LogLevel, Status } from '@ditsmod/core';

export class ErrorOpts {
  /**
   * Message for fronend.
   */
  msg1?: string = 'Internal server error';
  /**
   * Arguments for `msg1`.
   */
  args1?: any[] = [];
  /**
   * Message for a logger.
   */
  msg2?: string = '';
  /**
   * Arguments for `msg2`.
   */
  args2?: any[] = [];
  /**
   * Log level.
   */
  level?: LogLevel = 'debug';
  /**
   * HTTP response status.
   */
  status?: Status = Status.BAD_REQUEST;
  /**
   * Parameters available in the current HTTP request.
   */
  params?: any;

  constructor(info = {} as ErrorOpts) {
    let key: keyof ErrorOpts;
    for (key in info) {
      if (info[key] !== undefined) {
        this[key] = info[key];
      }
    }
  }
}

export class CustomError extends ChainError {
  constructor(info: ErrorOpts, cause?: Error) {
    // Merge with default options
    info = new ErrorOpts(info);

    super(`${info.msg1}`, { info, cause }, true);
  }
}

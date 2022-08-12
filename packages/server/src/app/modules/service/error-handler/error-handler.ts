import { format } from 'util';
import { Injectable } from '@ts-stack/di';
import { Logger, Status, Res, ControllerErrorHandler } from '@ditsmod/core';
import { ChainError } from '@ts-stack/chain-error';

import { ErrorOpts } from './custom-error';

@Injectable()
export class ErrorHandler implements ControllerErrorHandler {
  constructor(private res: Res, private logger: Logger) {}

  async handleError(err: ChainError<ErrorOpts> | Error) {
    if (err instanceof ChainError) {
      const template = err.info.msg1!;
      const paramName = err.info.args1![0];
      const args1 = err.info.args1!.slice(1);
      let message = err.message;
      if (template.includes('%s')) {
        message = format(template, ...args1);
      } else {
        message = template || message;
      }
      err.message = paramName ? `Parameter '${paramName}': ${message}` : message;
      const { level, status } = err.info;
      delete err.info.level;
      this.logger.log(level || 'debug', { err, ...err.info });
      if (!this.res.nodeRes.headersSent) {
        this.res.sendJson({ [paramName || 'error']: message }, status);
      }
    } else {
      this.logger.error({ err });
      if (!this.res.nodeRes.headersSent) {
        this.res.sendJson({ error: 'Internal server error' }, Status.INTERNAL_SERVER_ERROR);
      }
    }
  }
}

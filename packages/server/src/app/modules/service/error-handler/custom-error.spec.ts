import { Status } from '@ditsmod/core';
import { describe, it, expect } from '@jest/globals';
import { ChainError } from '@ts-stack/chain-error';

import { CustomError } from '@service/error-handler/custom-error';

describe('CustomError', () => {
  it('CustomError is instanceof ChainError', () => {
    expect(new CustomError({}) instanceof ChainError).toBe(true);
  });

  it('set msg1 and msg2 with arguments', () => {
    const msg1 = 'frontend %s message';
    const msg2 = 'backend %s message';
    const args1 = ['some'];
    const args2 = ['other'];
    const err = new CustomError({ msg1, args1, msg2, args2, level: 'warn', status: Status.CONFLICT });
    expect(err).toMatchObject({
      skipCauseMessage: true,
      currentMessage: msg1,
      cause: undefined,
      info: {
        msg1,
        args1,
        msg2,
        args2,
        level: 'warn',
        status: Status.CONFLICT,
      },
    });
  });
});

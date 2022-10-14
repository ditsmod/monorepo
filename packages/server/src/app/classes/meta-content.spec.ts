import 'reflect-metadata';
import { Property, getContent } from '@ditsmod/openapi';
import { describe, it, expect } from '@jest/globals';

import { getMetaContent } from './meta-content';

describe('Content', () => {
  it('case 1', () => {
    expect(getContent()).toEqual({});
  });

  it('case 2', () => {
    class SomeModel {
      @Property()
      property1: number;
      @Property()
      property2: string;
    }

    const expectedObj = {
      '*/*': {
        encoding: undefined,
        schema: {
          properties: {
            property1: {
              type: 'number',
            },
            property2: {
              type: 'string',
            },
          },
          type: 'object',
        },
      },
    };

    expect(getContent({ mediaType: '*/*', model: SomeModel })).toEqual(expectedObj);
  });
});

describe('MetaContent', () => {
  it('case 1', () => {
    expect(getMetaContent()).toEqual({});
  });

  it('case 2', () => {
    class SomeModel {
      @Property()
      property1: number;
      @Property()
      property2: string;
    }

    const expectedObj = {
      '*/*': {
        encoding: undefined,
        schema: {
          properties: {
            data: {
              items: {
                properties: {
                  property1: {
                    type: 'number',
                  },
                  property2: {
                    type: 'string',
                  },
                },
                type: 'object',
              },
              type: 'array',
            },
            error: {
              type: 'object',
            },
            meta: {
              type: 'object',
            },
          },
          type: 'object',
        },
      },
    };

    expect(getMetaContent({ mediaType: '*/*', model: SomeModel })).toEqual(expectedObj);
  });
});

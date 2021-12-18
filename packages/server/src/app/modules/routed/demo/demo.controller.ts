import { Controller, Req, Res, Status } from '@ditsmod/core';
import { JwtService } from '@ditsmod/jwt';
import { getContent, getParams, OasRoute } from '@ditsmod/openapi';

import { BasicGuard } from '@service/auth/basic.guard';
import { BearerGuard } from '@service/auth/bearer.guard';
import { Model1 } from './models';

@Controller()
export class DemoController {
  constructor(private req: Req, private res: Res, private jwtService: JwtService) {}

  @OasRoute('GET', '', [], {
    tags: ['demo'],
    description: 'This is "Hello, World!" controller',
    responses: {
      [Status.OK]: {
        description: `Here description for response with 200 status`,
        content: getContent({ mediaType: 'text/plain' }),
      },
    },
  })
  async sayHello() {
    this.res.send('Hello, World!');
  }

  @OasRoute('GET', 'name/:yourAge', [], {
    tags: ['demo'],
    description: 'This is controller with parameter in path and with TypeScript model',
    parameters: getParams('path', true, Model1, 'yourAge'),
    responses: {
      [Status.OK]: {
        description: `Here description for response with 200 status`,
        content: getContent({ mediaType: 'text/plain' }),
      },
    },
  })
  async showMyName() {
    this.res.send(`You are ${this.req.pathParams.yourAge} years old.`);
  }

  @OasRoute('GET', 'token', [], {
    tags: ['demo'],
  })
  async getJwtToken() {
    const token = await this.jwtService.signWithSecret({ some: 'value' });
    this.res.send(token);
  }

  @OasRoute('GET', 'bearer', [BearerGuard], {
    tags: ['demo'],
  })
  async bearer() {
    this.res.send('Hello, admin!');
  }

  @OasRoute('GET', 'basic', [BasicGuard], {
    tags: ['demo'],
  })
  async basic() {
    this.res.send('Hello, admin!');
  }
}

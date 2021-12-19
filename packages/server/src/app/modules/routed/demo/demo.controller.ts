import { Controller, Req, Res, Route, Status } from '@ditsmod/core';
import { JwtService } from '@ditsmod/jwt';
import { getContent, getParams, OasRoute, Parameters } from '@ditsmod/openapi';

import { BasicGuard } from '@service/auth/basic.guard';
import { BearerGuard } from '@service/auth/bearer.guard';
import { Params } from '@models/params';

@Controller()
export class DemoController {
  constructor(private req: Req, private res: Res, private jwtService: JwtService) {}

  // This method used default @Route() decorator.
  @Route('GET')
  async sayHello() {
    this.res.send('Hello, World!');
  }

  // Rest of the methods used OpenAPI specefication routes.
  @OasRoute('GET', 'user-categories/:userAge', [], {
    tags: ['demo'],
    description: 'This is controller with parameter in path and with TypeScript model',
    parameters: getParams('path', true, Params, 'userAge'),
    responses: {
      [Status.OK]: {
        description: `Here description for response with 200 status`,
        content: getContent({ mediaType: 'text/plain' }),
      },
    },
  })
  async showMyAge() {
    const age = this.req.pathParams.userAge as Params['userAge'];
    this.res.send(`You are ${age} years old.`);
  }

  @OasRoute('GET', 'resource1', [], {
    tags: ['demo'],
    description: 'This is controller with parameter in query and with TypeScript model',
    parameters: new Parameters()
      .required('query', Params, 'userAge').describe('Here description for userAge')
      .optional('query', Params, 'userName').describe('Here description for userName')
      .getParams(),
    responses: {
      [Status.OK]: {
        description: `Here description for response with 200 status`,
        content: getContent({ mediaType: 'text/plain' }),
      },
    },
  })
  async showWhoIam() {
    const age = this.req.queryParams.userAge as Params['userAge'];
    let msg = `You are ${age} years old`;
    const userName = this.req.queryParams.userName as Params['userName'];
    if (userName) {
      msg += ` and your name is ${userName}`;
    }
    this.res.send(`${msg}.`);
  }

  @OasRoute('GET', 'token', [], {
    tags: ['demo'],
    description: 'This OAS route used to get token for bearer guard.',
    responses: {
      [Status.OK]: {
        description: `Returns token for bearer guard`,
        content: getContent({ mediaType: 'text/plain' }),
      },
    },
  })
  async getJwtToken() {
    const token = await this.jwtService.signWithSecret({ id: 'user-id-here' });
    this.res.send(token);
  }

  @OasRoute('GET', 'bearer', [BearerGuard], {
    tags: ['demo'],
    description: 'This guard used bearer token for auth.',
  })
  async bearer() {
    this.res.send('Hello, admin!');
  }

  @OasRoute('GET', 'basic', [BasicGuard], {
    tags: ['demo'],
    description: 'This guard used basic auth.',
  })
  async basic() {
    this.res.send('Hello, admin!');
  }
}

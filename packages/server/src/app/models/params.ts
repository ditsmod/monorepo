import { Property } from '@ditsmod/openapi';

import { AppConfigService } from '@service/app-config/config.service';

const config = new AppConfigService();

export class Params {
  @Property({
    minimum: config.minUserAge,
    maximum: config.maxUserAge,
    description: `Age should be between ${config.minUserAge} and ${config.maxUserAge} years.`,
  })
  userAge: number;

  @Property({
    minLength: config.minUserName,
    maxLength: config.maxUserName,
    description: `User name should be between ${config.minUserName} and ${config.maxUserName} symbols.`,
  })
  userName: string;
}

export class RequestBody1 {
  @Property({
    minimum: config.minUserAge,
    maximum: config.maxUserAge,
    description: `Age should be between ${config.minUserAge} and ${config.maxUserAge} years.`,
  })
  userAge: number;

  @Property({
    minLength: config.minUserName,
    maxLength: config.maxUserName,
    description: `User name should be between ${config.minUserName} and ${config.maxUserName} symbols.`,
  })
  userName: string;
}

export class Response1 {
  @Property()
  ok: number;
}

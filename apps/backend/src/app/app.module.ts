import { Providers, rootModule } from '@ditsmod/core';
import { RoutingModule } from '@ditsmod/routing';
import { BodyParserModule } from '@ditsmod/body-parser';

import { HelloWorldModule } from './modules/routed/hello-world/hello-world.module.js';

@rootModule({
  providersPerApp: new Providers().useLogConfig({ level: 'debug' }),
  appends: [HelloWorldModule],
  imports: [RoutingModule, BodyParserModule],
  exports: [RoutingModule, BodyParserModule],
})
export class AppModule {}

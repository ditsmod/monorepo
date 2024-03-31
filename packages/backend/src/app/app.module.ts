import { Providers, rootModule } from '@ditsmod/core';
import { RoutingModule } from '@ditsmod/routing';

import { SomeModule } from '#routed/some/some.module.js';

@rootModule({
  providersPerApp: [...new Providers().useLogConfig({ level: 'info' })],
  appends: [SomeModule],
  imports: [RoutingModule],
  exports: [RoutingModule]
})
export class AppModule {}

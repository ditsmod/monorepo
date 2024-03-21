import { Providers, rootModule } from '@ditsmod/core';
import { RoutingModule } from '@ditsmod/routing';

import { SomeModule } from '#routed/some/some.module.js';

@rootModule({
  imports: [RoutingModule, { path: '', module: SomeModule }],
  providersPerApp: [...new Providers().useLogConfig({ level: 'info' })],
  exports: [RoutingModule]
})
export class AppModule {}

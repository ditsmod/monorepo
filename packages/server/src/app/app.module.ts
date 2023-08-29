import { Providers, rootModule } from '@ditsmod/core';
import { RouterModule } from '@ditsmod/router';

import { SomeModule } from '#routed/some/some.module.js';

@rootModule({
  imports: [RouterModule, { path: '', module: SomeModule }],
  controllers: [],
  providersPerApp: [...new Providers().useLogConfig({ level: 'info' })],
})
export class AppModule {}

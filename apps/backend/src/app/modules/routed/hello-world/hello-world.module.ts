import { featureModule } from '@ditsmod/core';

import { InjScopedController } from './default.controller.js';
import { CtxScopedController } from './singleton.controller.js';

@featureModule({ controllers: [InjScopedController, CtxScopedController] })
export class HelloWorldModule {}

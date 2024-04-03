import { featureModule } from '@ditsmod/core';

import { DefaultController } from './default.controller.js';
import { SingletonController } from './singleton.controller.js';

@featureModule({ controllers: [DefaultController, SingletonController] })
export class HelloWorldModule {}

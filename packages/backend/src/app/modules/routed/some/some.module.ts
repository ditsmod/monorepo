import { featureModule } from '@ditsmod/core';

import { SingletonController, SomeController } from './some.controller.js';

@featureModule({
  controllers: [SomeController, SingletonController],
})
export class SomeModule {}

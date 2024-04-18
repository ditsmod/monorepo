import { featureModule, ModuleWithParams } from '@ditsmod/core';
import { PRE_ROUTER_EXTENSIONS } from '@ditsmod/routing';

import { PACKAGE1_TOKEN, Package1Config } from './package1-config.js';
import { Package1Extension, PACKAGE1_EXTENSIONS } from './package1.extension.js';

@featureModule({
  providersPerReq: [{ token: PACKAGE1_TOKEN, useValue: {} }],
  exports: [PACKAGE1_TOKEN],
  extensions: [
    {
      extension: Package1Extension,
      groupToken: PACKAGE1_EXTENSIONS,
      nextToken: PRE_ROUTER_EXTENSIONS,
      exported: true,
    },
  ],
})
export class Package1Module {
  static withParams(config: Package1Config): ModuleWithParams<Package1Module> {
    return {
      module: this,
      providersPerMod: [{ token: Package1Config, useValue: config }],
      exports: [Package1Config],
    };
  }
}

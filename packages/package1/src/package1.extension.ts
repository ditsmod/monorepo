import {
  Extension,
  ExtensionsManager,
  HTTP_INTERCEPTORS,
  PerAppService,
  injectable,
  InjectionToken,
} from '@ditsmod/core';
import { ROUTES_EXTENSIONS } from '@ditsmod/routing';

import { Package1Config } from './package1-config.js';
import { Package1Interceptor } from './package1.interceptor.js';
import { SingletonPackage1Interceptor } from './singleton-package1.interceptor.js';

export const PACKAGE1_EXTENSIONS = new InjectionToken<Extension<void>[]>('PACKAGE1_EXTENSIONS');

@injectable()
export class Package1Extension implements Extension<void> {
  private inited: boolean;

  constructor(
    protected extensionManager: ExtensionsManager,
    protected perAppService: PerAppService,
  ) {}

  async init() {
    if (this.inited) {
      return;
    }

    const aMetadataPerMod2 = await this.extensionManager.init(ROUTES_EXTENSIONS);
    aMetadataPerMod2.forEach((metadataPerMod2) => {
      const { aControllersMetadata2, providersPerMod } = metadataPerMod2;
      aControllersMetadata2.forEach(({ providersPerRou, providersPerReq, httpMethod, isSingleton }) => {
        // Merging the providers from a module and a controller
        const mergedProvidersPerRou = [...metadataPerMod2.providersPerRou, ...providersPerRou];
        const mergedProvidersPerReq = [...metadataPerMod2.providersPerReq, ...providersPerReq];

        // Creating a hierarchy of injectors.
        const injectorPerApp = this.perAppService.injector;
        const injectorPerMod = injectorPerApp.resolveAndCreateChild(providersPerMod);
        const injectorPerRou = injectorPerMod.resolveAndCreateChild(mergedProvidersPerRou);

        // ** Some fake processing. **
        if (isSingleton) {
          let package1Config = injectorPerRou.get(Package1Config, undefined, {}) as Package1Config;
          package1Config = { ...new Package1Config(), ...package1Config }; // Merge with default.
          if (package1Config.one) {
            providersPerRou.push({ token: HTTP_INTERCEPTORS, useClass: SingletonPackage1Interceptor, multi: true });
          }
        } else {
          const injectorPerReq = injectorPerRou.resolveAndCreateChild(mergedProvidersPerReq);
          let package1Config = injectorPerReq.get(Package1Config, undefined, {}) as Package1Config;
          package1Config = { ...new Package1Config(), ...package1Config }; // Merge with default.
          if (package1Config.one) {
            providersPerReq.push({ token: HTTP_INTERCEPTORS, useClass: Package1Interceptor, multi: true });
          }
        }
        // **
      });
    });

    this.inited = true;
  }
}

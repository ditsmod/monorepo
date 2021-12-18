import { Module } from '@ditsmod/core';

import { ModuleConfigService } from './config.service';
import { CryptoService } from './crypto.service';

@Module({
  providersPerMod: [ModuleConfigService],
  providersPerReq: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}

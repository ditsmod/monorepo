import { Column } from '@ditsmod/openapi';

import { AppConfigService } from '@service/app-config/config.service';
import { ServerMsg } from '@service/msg/server-msg';
import { VALIDATION_ARGS } from '@service/validation/types';

const config = new AppConfigService();
const serverMsg = new ServerMsg();

export class Params {
  @Column()
  authorization: string;
  @Column()
  lcl: string;
  @Column()
  refresh: boolean;
}

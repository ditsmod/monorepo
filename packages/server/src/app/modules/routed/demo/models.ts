import { Column } from '@ditsmod/openapi';

export class Model1 {
  @Column({ minimum: 12, maximum: 90 })
  yourAge: number;
}

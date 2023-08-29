import request = require('supertest');
import { TestApplication } from '@ditsmod/testing';

import { AppModule } from '#src/app/app.module.js';


describe('01-hello-world', () => {
  it('controller works', async () => {
    const server = await new TestApplication(AppModule, { path: 'api' }).getServer();
    await request(server)
      .get('/api')
      .expect(200)
      .expect('Hello World!');

    server.close();
  });
});

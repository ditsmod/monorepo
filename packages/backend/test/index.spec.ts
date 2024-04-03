import request from 'supertest';
import { TestApplication } from '@ditsmod/testing';
import { Server } from '@ditsmod/core';
import { jest } from '@jest/globals';

import { AppModule } from '#app/app.module.js';

describe('Integration tests for HelloWorldController', () => {
  let server: Server;
  let testAgent: ReturnType<typeof request>;

  beforeAll(async () => {
    jest.restoreAllMocks();
    server = await new TestApplication(AppModule, { path: 'api' }).getServer();
    testAgent = request(server);
  });

  afterAll(() => {
    server.close();
  });

  it('controller works', async () => {
    await testAgent.get('/api/hello').expect(200).expect('Hello World!');
  });

  it('should parsed post', async () => {
    await testAgent.post('/api/body').send({ one: 1 }).expect(200).expect({ one: 1 });
  });

  it('should throw an error', async () => {
    await testAgent.get('/api/throw-error').expect(500);
  });

  it('singleton controller works', async () => {
    await testAgent.get('/api/hello2').expect(200).expect('Hello World!');
  });

  it('singleton controller should parsed post', async () => {
    await testAgent.post('/api/body2').send({ one: 1 }).expect(200).expect({ one: 1 });
  });

  it('singleton controller should throw an error', async () => {
    await testAgent.get('/api/throw-error2').expect(500);
  });
});

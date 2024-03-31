import request = require('supertest');
import type { SuperTest } from 'supertest';
import { NodeServer } from '@ditsmod/core';
import { TestApplication } from '@ditsmod/testing';
import { jest } from '@jest/globals';

import { AppModule } from '#app/app.module.js';

describe('01-hello-world', () => {
  let server: NodeServer;
  let superTest: SuperTest<request.Test>;

  beforeAll(async () => {
    jest.restoreAllMocks();
    server = await new TestApplication(AppModule, { path: 'api' }).getServer();
    superTest = request(server);
  });

  afterAll(() => {
    server.close();
  });

  it('controller works', async () => {
    await superTest.get('/api/hello').expect(200).expect('Hello World!');
  });

  it('controller as singleton works', async () => {
    await superTest.get('/api/hello2').expect(200).expect('Hello World!');
  });
});

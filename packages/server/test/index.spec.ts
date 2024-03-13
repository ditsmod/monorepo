import request = require('supertest');
import { NodeServer } from '@ditsmod/core';
import { TestApplication } from '@ditsmod/testing';
import { jest } from '@jest/globals';

import { AppModule } from '#app/app.module.js';


describe('01-hello-world', () => {
  let server: NodeServer;

  beforeAll(async () => {
    jest.restoreAllMocks();
    server = await new TestApplication(AppModule, { path: 'api' }).getServer();
  });

  afterAll(() => {
    server.close();
  });

  it('controller works', async () => {
    await request(server)
      .get('/api/hello')
      .expect(200)
      .expect('Hello World!');
  });

  it('controller as singleton works', async () => {
    await request(server)
      .get('/api/hello2')
      .expect(200)
      .expect('Hello World!');
  });
});

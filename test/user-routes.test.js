const { server } = require('../server');
const request = require('supertest');
const faker = require('faker');
const User = require('../models/User');
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');
const { populateUsersTestDb } = require('../utilities/populate-test-db');

// Populate test DB before each test
beforeEach(async () => {
  await populateUsersTestDb();
});

// Drop test collection after each test
afterEach(async () => {
  await User.collection.drop();
  await server.close();
});

// Close DB connection after all tests have run
afterAll(async () => {
  mongoose.disconnect();
});

describe('status codes', () => {
  it('should respond with status code 200 for POST /api/users', async () => {
    const newUser = {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      password: faker.finance.account()
    };

    const response = await request(server)
      .post('/api/users')
      .send(newUser);

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.body.user).toStrictEqual(
      expect.objectContaining({
        name: expect.any(String),
        email: expect.any(String),
        password: expect.any(String)
      })
    );
  });

  it('should respond with status code 200 for GET /api/users', async () => {
    const response = await request(server).get('/api/users');

    expect(response.status).toEqual(HttpStatus.OK);
  });
});

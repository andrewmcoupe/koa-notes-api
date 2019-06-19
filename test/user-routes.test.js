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

  it('should respond with status code 200 for GET /api/users/:id', async () => {
    const allUsers = await request(server).get('/api/users');
    const { _id: id } = allUsers.body.users[0];
    const response = await request(server).get(`/api/users/${id}`);

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        user: expect.any(Object)
      })
    );
    expect(response.body.user).toEqual(
      expect.objectContaining({
        _id: id,
        name: expect.any(String),
        email: expect.any(String),
        password: expect.any(String)
      })
    );
  });

  it('should respond with status code 500 for GET /api/users/:id', async () => {
    const response = await request(server).get(`/api/users/@`);

    expect(response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });

  it('should respond with status code 500 for GET /api/users/:id', async () => {
    const response = await request(server).get(`/api/users/123123123123`);

    expect(response.status).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String)
      })
    );
  });
});

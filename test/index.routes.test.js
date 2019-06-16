const server = require('../server');
const request = require('supertest');
const faker = require('faker');
const Note = require('../models/Note');
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');
const { populateTestDb } = require('../utilities/populate-test-db');

// Set to test environment
beforeAll(() => {
  process.env.NODE_ENV = 'test';
});

// Populate test DB before each test
beforeEach(async () => {
  await populateTestDb();
});

// Drop test collection after each test
afterEach(async () => {
  await Note.collection.drop();
  server.close();
});

// Close DB connection after all tests have run
afterAll(async () => {
  mongoose.disconnect();
});

describe('status codes', () => {
  it('should respond with status code 200 for /api', async () => {
    const response = await request(server).get('/api/notes');

    expect(response.status).toEqual(HttpStatus.OK);
  });

  it('should respond with status code 400 for /api/notes with bad request', async () => {
    const response = await request(server)
      .post('/api/notes')
      .send({
        title: 5
      });

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('should respond with status code 400 for /api/notes', async () => {
    const response = await request(server)
      .post('/api/notes')
      .send({
        title: faker.random.words(3)
      });

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('should respond with status code 200 for /api/notes', async () => {
    const response = await request(server)
      .post('/api/notes')
      .send({
        title: faker.random.words(3),
        body: faker.random.words(6)
      });

    expect(response.status).toEqual(HttpStatus.OK);
  });
});

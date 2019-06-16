process.env.TEST_ENV = 'true';

const { server, db } = require('../server');
const request = require('supertest');
const faker = require('faker');
const Note = require('../models/Note');
const mongoose = require('mongoose');

async function populateTestDb() {
  const note1 = new Note({
    title: faker.random.words(4),
    body: faker.random.words(4)
  });

  const note2 = new Note({
    title: faker.random.words(4),
    body: faker.random.words(4)
  });

  await note1.save();
  await note2.save();
}

beforeEach(async () => {
  await populateTestDb();
});

afterEach(async () => {
  await Note.collection.drop();
  server.close();
});

afterAll(async () => {
  mongoose.disconnect();
});

describe('status codes', () => {
  it('should respond with status code 200 for /api', async () => {
    const response = await request(server).get('/api/notes');

    expect(response.status).toEqual(200);
  });

  it('should respond with status code 400 for /api/notes with bad request', async () => {
    const response = await request(server)
      .post('/api/notes')
      .send({
        title: 5
      });

    expect(response.status).toEqual(400);
  });

  it('should respond with status code 400 for /api/notes', async () => {
    const response = await request(server)
      .post('/api/notes')
      .send({
        title: faker.random.words(3)
      });

    expect(response.status).toEqual(400);
  });

  it('should respond with status code 200 for /api/notes', async () => {
    const response = await request(server)
      .post('/api/notes')
      .send({
        title: faker.random.words(3),
        body: faker.random.words(6)
      });

    expect(response.status).toEqual(201);
  });
});

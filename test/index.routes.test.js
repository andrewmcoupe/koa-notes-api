const server = require('../server');
const request = require('supertest');
const faker = require('faker');

afterEach(() => {
  server.close();
});

describe('status codes', () => {
  it('should respond with status code 200 for /api', async () => {
    const response = await request(server).get('/api');

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

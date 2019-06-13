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

  it('should respond with status code 200 for /api/notes', async () => {
    const response = await request(server)
      .post('/api/notes')
      .send({
        title: faker.random.word()
      });

    expect(response.status).toEqual(200);
  });
});

const { server } = require('../server');
const request = require('supertest');
const faker = require('faker');
const Note = require('../models/Note');
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');
const { populateNotesTestDb } = require('../utilities/populate-test-db');

// Populate test DB before each test
beforeEach(async () => {
  await populateNotesTestDb();
});

// Drop test collection after each test
afterEach(async () => {
  await Note.collection.drop();
  await server.close();
});

// Close DB connection after all tests have run
afterAll(async () => {
  mongoose.disconnect();
});

describe('status codes', () => {
  it('should respond with correct data for GET /api/notes', async () => {
    const response = await request(server).get('/api/notes');

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.body).toStrictEqual(
      expect.objectContaining({
        message: expect.any(String),
        notes: expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String)
          })
        ])
      })
    );
  });

  it('should respond with status code 200 for GET /api/notes', async () => {
    const response = await request(server).get('/api/notes');

    expect(response.status).toEqual(HttpStatus.OK);
  });

  it('should respond with status code 200 for POST /api/notes', async () => {
    const response = await request(server)
      .post('/api/notes')
      .send({
        title: faker.random.words(3),
        body: faker.random.words(6)
      });

    expect(response.status).toEqual(HttpStatus.OK);
  });

  it('should respond with status code 400 for POST /api/notes', async () => {
    const response = await request(server)
      .post('/api/notes')
      .send({
        title: 5
      });

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('should respond with status code 400 for POST /api/notes', async () => {
    const response = await request(server)
      .post('/api/notes')
      .send({
        title: faker.random.words(3)
      });

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('should respond with status code 404 for POST /api/notes/:id', async () => {
    const response = await request(server).get(`/api/notes/123123123123`);

    expect(response.status).toEqual(HttpStatus.NOT_FOUND);
  });

  it('should respond with status code 500 for POST /api/notes/:id', async () => {
    const response = await request(server).get(`/api/notes/bad`);

    expect(response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('should respond with status code 200 for POST /api/notes/:id', async () => {
    const allNotes = await request(server).get('/api/notes');
    const { _id: id } = allNotes.body.notes[0];

    const response = await request(server).get(`/api/notes/${id}`);

    expect(response.status).toEqual(HttpStatus.OK);
  });

  it('should respond with correct data for POST /api/notes/:id', async () => {
    const allNotes = await request(server).get('/api/notes');
    const { _id: id } = allNotes.body.notes[0];

    const response = await request(server).get(`/api/notes/${id}`);

    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        note: expect.any(Object)
      })
    );
    expect(response.body.note).toEqual(
      expect.objectContaining({
        _id: id,
        title: expect.any(String),
        body: expect.any(String)
      })
    );
  });

  it('should respond with status code 200 and correct data for PUT /api/notes/:id', async () => {
    const allNotes = await request(server).get('/api/notes');
    const { _id: id } = allNotes.body.notes[0];
    const noteUpdate = {
      title: faker.random.words(3),
      body: faker.random.words(3)
    };

    const response = await request(server)
      .put(`/api/notes/${id}`)
      .send(noteUpdate);

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.body.note.title).toEqual(noteUpdate.title);
    expect(response.body.note.body).toEqual(noteUpdate.body);
  });

  it('should respond with status code 404 for PUT /api/notes/:id', async () => {
    const noteUpdate = {
      title: faker.random.words(3),
      body: faker.random.words(3)
    };

    const response = await request(server)
      .put(`/api/notes/123123123123`)
      .send(noteUpdate);

    expect(response.status).toEqual(HttpStatus.NOT_FOUND);
  });

  it('should respond with status code 400 for PUT /api/notes/:id', async () => {
    const allNotes = await request(server).get('/api/notes');
    const { _id: id } = allNotes.body.notes[0];
    const noteUpdate = {
      title: faker.random.words(3)
    };
    const response = await request(server)
      .put(`/api/notes/${id}`)
      .send(noteUpdate);

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('should respond with status code 200 for DELETE /api/notes/:id', async () => {
    const allNotes = await request(server).get('/api/notes');
    const { _id: id } = allNotes.body.notes[0];

    const response = await request(server).delete(`/api/notes/${id}`);

    expect(response.status).toEqual(HttpStatus.OK);
  });

  it('should respond with status code 404 for DELETE /api/notes/:id', async () => {
    const response = await request(server).delete(`/api/notes/123123123123`);

    expect(response.status).toEqual(HttpStatus.NOT_FOUND);
  });
});

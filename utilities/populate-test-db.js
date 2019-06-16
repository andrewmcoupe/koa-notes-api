const Note = require('../models/Note');
const faker = require('faker');

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

module.exports = { populateTestDb };

const Note = require('../models/Note');
const User = require('../models/User');
const faker = require('faker');

async function populateNotesTestDb() {
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

async function populateUsersTestDb() {
  const user1 = new User({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.finance.account()
  });

  const user2 = new User({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.finance.account()
  });

  await user1.save();
  await user2.save();
}

module.exports = { populateNotesTestDb, populateUsersTestDb };

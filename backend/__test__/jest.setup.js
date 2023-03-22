const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/test-db';

beforeAll(async () => {
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
});

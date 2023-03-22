
const request = require('supertest');
const app = require('../app');
const File = require('../app/models/file.model');
const User = require('../app/models/user.model');
const bcrypt = require("bcryptjs");


describe('Get Files', () => {
  let token = '';

  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({
      username: 'tester',
      email: 'test@example.com',
      password: bcrypt.hashSync('password', 8),
    });
    await user.save();
    await File.deleteMany({});

    const filesSavePromises = Array(3).fill().map((_, i) => (new File({
      filename: 'file' + i,
    })).save());

    await Promise.all(filesSavePromises);
    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        username: 'tester',
        password: 'password',
      });
    token = response.body.accessToken
  });

  it('should be able to get the list of files', async () => {
    const response = await request(app)
      .get('/api/files')
      .set('x-access-token', token);
    expect(response.body).toHaveLength(3);
  });
});

describe('Upload Files', () => {
  let token = '';
  beforeEach(async () => {
    await File.deleteMany({});
    await User.deleteMany({});
    const user = new User({
      username: 'tester',
      email: 'test@example.com',
      password: bcrypt.hashSync('password', 8),
    });
    await user.save();

    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        username: 'tester',
        password: 'password',
      });
    token = response.body.accessToken
  });

  it('should be able to upload data with token', async () => {
    const mockFile = Buffer.from('mock data');

    const response = await request(app)
      .post('/api/files/')
      .set('x-access-token', token)
      .attach('file', mockFile, 'mockfile.txt');
    expect(response.statusCode).toBe(200);
  });
});

describe('Down File', () => {
  let token = '';
  beforeEach(async () => {
    await File.deleteMany({});
    await User.deleteMany({});
    const user = new User({
      username: 'tester',
      email: 'test@example.com',
      password: bcrypt.hashSync('password', 8),
    });
    await user.save();

    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        username: 'tester',
        password: 'password',
      });
    token = response.body.accessToken
  });

  it('should be able to upload data with token', async () => {
    const mockFile = Buffer.from('mock data');

    const uploadResponse = await request(app)
      .post('/api/files/')
      .set('x-access-token', token)
      .attach('file', mockFile, 'mockfile.txt');
    expect(uploadResponse.statusCode).toBe(200);

    const downloadResponse = await request(app)
      .get('/api/files/download')
      .query(
        {
          id: 'mockfile.txt'
        }
      )
      .set('x-access-token', token);
    expect(downloadResponse.statusCode).toBe(200);

  });
});

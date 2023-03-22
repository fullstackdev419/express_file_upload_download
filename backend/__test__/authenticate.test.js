const request = require('supertest')
const app = require('../app');
const User = require('../app/models/user.model');
const bcrypt = require("bcryptjs");

describe('Sign Up', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({
      username: 'tester',
      email: 'test@example.com',
      password: bcrypt.hashSync('password', 8),
    });
    await user.save();
  })

  it('should be able to sign up', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'dev',
        email: 'dev@gmail.com',
        password: 'password',
      });
    expect(response.statusCode).toBe(200);
  });

  it('should not be able to sign up with duplicated username', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'tester',
        email: 'test@example.com',
        password: 'password',
      });
    expect(response.statusCode).toBe(400);
  });
});

describe('Sign In', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({
      username: 'tester',
      email: 'test@example.com',
      password: bcrypt.hashSync('password', 8),
    });
    await user.save();
  })

  it('should be able to sign in with correct credientials', async () => {
    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        username: 'tester',
        password: 'password',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.accessToken).not.toBeNull();
  });

  it('should not be able to sign in with incorrect credientials', async () => {
    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        username: 'tester',
        password: 'wrong password',
      });
    expect(response.statusCode).toBe(401);
  });
});

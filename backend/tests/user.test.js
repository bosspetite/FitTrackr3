const app = require('../app');
const mongoose = require('mongoose');
const request = require('supertest');
const User = require('../models/User');
const { expect } = require('chai');

describe('User API', function() {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/fitness-tracker-test', { useNewUrlParser: true, useUnifiedTopology: true });
    await User.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ email: 'test@example.com', password: '123456' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('msg');
  });

  it('should not register with duplicate email', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ email: 'test@example.com', password: '123456' });
    expect(res.status).to.equal(400);
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: '123456' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });
});
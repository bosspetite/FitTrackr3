const app = require('../app');
const mongoose = require('mongoose');
const request = require('supertest');
const User = require('../models/User');
const Activity = require('../models/Activity');
const { expect } = require('chai');

let token;

describe('Activity API', function() {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/fitness-tracker-test', { useNewUrlParser: true, useUnifiedTopology: true });
    await User.deleteMany({});
    await Activity.deleteMany({});
    await request(app).post('/api/users/register').send({ email: 'a@b.com', password: '123456' });
    const res = await request(app).post('/api/users/login').send({ email: 'a@b.com', password: '123456' });
    token = res.body.token;
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('should add an activity', async () => {
    const res = await request(app)
      .post('/api/activities')
      .set('x-auth-token', token)
      .send({ type: 'Run', duration: 30, notes: 'Morning run' });
    expect(res.status).to.equal(200);
    expect(res.body.type).to.equal('Run');
  });

  it('should get activities for a user', async () => {
    const res = await request(app)
      .get('/api/activities')
      .set('x-auth-token', token);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
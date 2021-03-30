import request from 'supertest';

import { createTestApp } from '../createTestApp';

let app: any;

const USER_DATA_VALID = {
  username: 'test1',
  fullName: 'test test',
  email: 'test@test.com',
  password: 'test1234',
};

const USER_DATA_INVALID_PASSWORD = {
  username: 'test2',
  fullName: 'test test',
  email: 'test@test.com',
  password: 'test',
};

const USER_DATA_INVALID_NAME = {
  username: 'test3',
  fullName: 'te',
  email: 'test@test.com',
  password: 'test',
};

const USER_DATA_INVALID_EMAIL = {
  username: 'test4',
  fullName: 'test test',
  email: 'test',
  password: 'test1234',
};

const USER_DATA_INVALID_EVERYTHING = {
  username: '',
  fullName: '',
  email: 'test',
  password: 'test',
};

describe('UserController', () => {
  beforeAll(async done => {
    app = await createTestApp();

    done();
  });

  test('PUT / - unauthenticated w/ valid user data - should create user', async done => {
    await request(app)
      .put('/api/v1/user')
      .send(USER_DATA_VALID)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.token.length).not.toBe(0);
        expect(response.body.expiresIn).toBe(3600);
        done();
      })
      .catch(err => done(err));
  });

  test('PUT / - unauthenticated w/ invalid user data (password) - should fail', async done => {
    await request(app)
      .put('/api/v1/user')
      .send(USER_DATA_INVALID_PASSWORD)
      .expect('Content-Type', /json/)
      .expect(500)
      .then(() => {
        done();
      })
      .catch(err => done(err));
  });

  test('PUT / - unauthenticated w/ invalid user data (name) - should fail', async done => {
    await request(app)
      .put('/api/v1/user')
      .send(USER_DATA_INVALID_NAME)
      .expect('Content-Type', /json/)
      .expect(500)
      .then(() => {
        done();
      })
      .catch(err => done(err));
  });

  test('PUT / - unauthenticated w/ invalid user data (email) - should fail', async done => {
    await request(app)
      .put('/api/v1/user')
      .send(USER_DATA_INVALID_EMAIL)
      .expect('Content-Type', /json/)
      .expect(500)
      .then(() => {
        done();
      })
      .catch(err => done(err));
  });

  test('PUT / - unauthenticated w/ invalid user data (everything) - should fail', async done => {
    await request(app)
      .put('/api/v1/user')
      .send(USER_DATA_INVALID_EVERYTHING)
      .expect('Content-Type', /json/)
      .expect(500)
      .then(() => {
        done();
      })
      .catch(err => done(err));
  });
});

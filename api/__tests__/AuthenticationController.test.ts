import request from 'supertest';
import Container from 'typedi';

import { createTestApp } from '../createTestApp';
import { AuthenticationService } from '../src/services/AuthenticationService';
import { UserService } from '../src/services/UserService';

let app: any;
let token: string;

const USER_DATA = {
  username: 'test',
  fullName: 'test test',
  email: 'test@test.com',
  password: 'test',
};

describe('AuthenticationController', () => {
  beforeAll(async done => {
    app = await createTestApp();

    const userService = Container.get(UserService);
    const authenticationService = Container.get(AuthenticationService);

    await userService.add(
      USER_DATA.username,
      USER_DATA.fullName,
      USER_DATA.email,
      USER_DATA.password
    );

    token = (
      await authenticationService.authenticate({
        username: USER_DATA.username,
        password: USER_DATA.password,
      })
    ).token;

    done();
  });

  test('GET / - unauthenticated - should return nothing', async done => {
    await request(app)
      .get('/api/v1/authentication')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.isAuthenticated).toBe(false);
        done();
      })
      .catch(err => done(err));
  });

  test('GET / - authenticated - should return user data', async done => {
    await request(app)
      .get('/api/v1/authentication')
      .set('Authorization', 'Bearer ' + token)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.isAuthenticated).toBe(true);
        expect(response.body.username).toBe(USER_DATA.username);
        expect(response.body.fullName).toBe(USER_DATA.fullName);
        done();
      })
      .catch(err => done(err));
  });

  test('POST / - unauthenticated - should authenticate user', async done => {
    await request(app)
      .post('/api/v1/authentication')
      .send({
        username: USER_DATA.username,
        password: USER_DATA.password,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.token.length).not.toBe(0);
        expect(response.body.expiresIn).toBe(3600);
        done();
      })
      .catch(err => done(err));
  });

  test('POST / - unauthenticated w/ invalid data - should not authenticate user', async done => {
    await request(app)
      .post('/api/v1/authentication')
      .send({
        username: USER_DATA.username,
        password: 'testttt',
      })
      .expect('Content-Type', /json/)
      .expect(500)
      .then(() => {
        done();
      })
      .catch(err => done(err));
  });
});

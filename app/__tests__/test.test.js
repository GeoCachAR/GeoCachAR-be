import request from 'supertest';
import { seedUserData, seedMapData } from '../db/seed.js';
import maps from '../db/mapTest.js';
import users from '../db/usersTest.js';
import app from '../../app.js';

beforeEach(() => {
  return users
    .map((user) => seedUserData(user))
    .concat(maps.map((map) => seedMapData(map)));
});

describe('POST', () => {
  describe('account', () => {
    test('Should let a user log in', () => {
      const postRequest = {
        email: 'email@email.com',
        password: 'test123',
      };
      return request(app)
        .post('/api/account')
        .send(postRequest)
        .expect(200)
        .then((response) => {
          const { uid } = response.body;
          expect(uid).toBe('lFdvdh4a5mUpIcd9d8EdXtdGYH83');
        });
    });
    test("Should return a 404 not found if the email doesn't exist", () => {
      const postRequest = {
        email: 'emali@email.com',
        password: 'test123',
      };
      return request(app)
        .post('/api/account')
        .send(postRequest)
        .expect(404)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe('Email not found');
        });
    });
    test('should return 403 when the incorrect password is passed ', () => {
      const postRequest = {
        email: 'email@email.com',
        password: '1234567',
      };
      return request(app)
        .post('/api/account')
        .send(postRequest)
        .expect(403)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe('Incorrect password');
        });
    });
    test('should return 400 when body is formatted incorrectly', () => {
      const postRequest = `email,password\nemail@email.com,1234`;
      return request(app)
        .post('/api/account')
        .send(postRequest)
        .expect(400)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe('Invalid body format');
        });
    });
  });
});

describe('api/users', () => {
  describe('post', () => {
    it('should be able to create an account with email password', () => {
      const postRequest = {
        email: 'rightnow@email.com',
        password: 'Coding1',
        name: 'test1st',
      };
      return request(app)
        .post('/api/users')
        .send(postRequest)
        .expect(201)
        .then((response) => {
          const { uid } = response.body;
          expect(uid).toEqual(expect.any(String));
        });
    });
    it('should return 403 when an e-mail already exists', () => {
      const postRequest = {
        email: 'test@test.com',
        password: 'Coding1',
        name: 'hello',
      };
      return request(app)
        .post('/api/users')
        .send(postRequest)
        .expect(403)
        .then((response) => {
          const msg = response.body.msg;
          expect(msg).toEqual('Email already in use');
        });
    });
    it('should return invalid password and 400 ', () => {
      const postRequest = {
        email: 'test5@test.com',
        password: 'Codin',
        name: 'lksjdf',
      };
      return request(app)
        .post('/api/users')
        .send(postRequest)
        .expect(400)
        .then((response) => {
          const msg = response.body.msg;
          expect(msg).toEqual(expect.any(String));
        });
    });
    it('should return an error if the data is formatted incorrectly ', () => {
      const postRequest = `email,password\nemail@test.com,1234`;
      return request(app)
        .post('/api/account')
        .send(postRequest)
        .expect(400)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe('Invalid body format');
        });
    });
    it('should accept a username in addition', () => {
      const postRequest = {
        email: 'itstillworks@test.com',
        password: 'Coding',
        name: 'TestUserFinally',
      };
      return request(app)
        .post('/api/users')
        .send(postRequest)
        .expect(201)
        .then((response) => {
          const { uid } = response.body;
          expect(uid).toEqual(expect.any(String));
        });
    });
  });
});

describe('GET /api/maps', () => {
  it('should return a list of all maps', () => {
    return request(app)
      .get('/api/maps')
      .expect(200)
      .then((response) => {
        const keys = Object.keys(response.body.maps);

        const testMapObj = {
          location: {
            LatDelta: 0,
            Latitude: 0,
            LonDelta: 0,
            Longtitude: 0,
            radius: 100,
          },
          mapLocation: 'London',
          mapName: 'Geo Map',
          waypoints: [
            { Latitude: 0, Longtitude: 0, description: '', title: 'clue one' },
            { Latitude: 0, Longtitude: 0, description: '', title: 'clue two' },
          ],
        };
        expect(keys).toContain('100');
        expect(keys).toContain('101');
        expect(keys).toContain('102');
        expect(response.body.maps[100]).toMatchObject(testMapObj);
      });
  });
});

describe('GET /api/maps/:map_id', () => {
  it.only('should return the map with the given id', () => {
    return request(app)
    .get('/api/maps/101')
    .expect(200)
    .then((response) => {
      const map = response.body.map
      console.log(map.waypoints)
      const resultMap =  {
        mapName: 'Jay Map',
        mapLocation: 'London',
        waypoints: [
          {
            title: 'clue one',
            description: '',
            Latitude: 0,
            Longtitude: 0,
          },
          {
            title: 'clue two',
            description: '',
            Latitude: 0,
            Longtitude: 0,
          },
        ],
        location: {
          Latitude: 0,
          Longtitude: 0,
          LatDelta: 0,
          LonDelta: 0,
          radius: 100,
        },
      }
      expect(map).toEqual(resultMap)    
    })
  });
  it('should return a 404 not found if the given id is not currently in use', () => {
    return request (app)

    .get('/api/maps/1000')
    .expect(404)
    .then((response) => {
      const msg = response.body.msg
      expect(msg).toBe('Error, map not found')
    })
  });
});

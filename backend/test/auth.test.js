import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import router from '../routes/auth.js';
import tokenVerification from '../middleware/auth.js';

jest.mock('../config/db.js');
jest.mock('../middleware/auth.js');

describe('Authentication Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use(router);
  });

  describe('POST /login', () => {
    it('should return a token when valid credentials are provided', async () => {
      const mockUser = { first_name: 'akshay', password: 'password123' };
      
      db.query.mockImplementationOnce((query, params, callback) => {
        callback(null, [mockUser]);
      });

      const response = await request(app)
        .post('/login')
        .send({
          first_name: 'akshay',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    it('should return an error if db query fails', async () => {
      db.query.mockImplementationOnce((query, params, callback) => {
        callback(new Error('Database error'), null);
      });

      const response = await request(app)
        .post('/login')
        .send({
          first_name: 'akshay',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Database error');
    });
  });

  describe('POST /validate-token', () => {
    it('should return valid token info if token is valid', async () => {
      tokenVerification.mockImplementationOnce((req, res, next) => {
        req.user = { first_name: 'John', password: 'password123' };
        next();
      });

      const response = await request(app)
        .post('/validate-token')
        .set('Authorization', 'Bearer someValidToken');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Token is valid');
      expect(response.body.user.username).toBe('John');
      expect(response.body.user.password).toBe('password123');
    });

    it('should return 401 if token is invalid', async () => {
      tokenVerification.mockImplementationOnce((req, res, next) => {
        res.status(401).json({ message: 'Invalid token' });
      });

      const response = await request(app)
        .post('/validate-token')
        .set('Authorization', 'Bearer invalidToken');

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid token');
    });
  });
});

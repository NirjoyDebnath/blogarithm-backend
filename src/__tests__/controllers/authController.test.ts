import { logIn } from '../../controllers/authController';
import { mockAuthService } from '../../__mocks__/authService';
import { Request, Response, NextFunction } from 'express';
describe('authController', () => {
  test('login test', async () => {
    const req = {
      body: { username: 'testuser', password: 'password' }
    } as Request;
    const res = { asdf: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;
    const token = await logIn(req, res, next);
  });
});

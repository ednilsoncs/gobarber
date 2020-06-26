import { Router, Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user } = await authenticateUserService.execute({
      email,
      password,
    });
    delete user.password;
    return response.json({ user });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;

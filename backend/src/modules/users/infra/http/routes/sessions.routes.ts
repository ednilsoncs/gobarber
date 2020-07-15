import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const authenticateUserService = container.resolve(AuthenticateUserService);
  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });
  delete user.password;
  return response.json({ user, token });
});

export default usersRouter;

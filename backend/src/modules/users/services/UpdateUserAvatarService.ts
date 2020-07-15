import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      const usersAvatarFilePath = path.join(
        uploadConfig.directory,
        user.avatar,
      );
      const usersAvatarFileExist = await fs.promises.stat(usersAvatarFilePath);

      if (usersAvatarFileExist) {
        await fs.promises.unlink(usersAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;

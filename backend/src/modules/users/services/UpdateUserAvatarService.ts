import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

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

    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;

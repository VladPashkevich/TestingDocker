import { UsersRepositoryTypeORM } from './users.repository';
import { CreateUsersDto, ReturnUsers } from './users.types';

export class UsersService {
  constructor(protected usersRepository: UsersRepositoryTypeORM) {}

  async getAllUsers(): Promise<ReturnUsers[]> {
    return this.usersRepository.getAllUsers();
  }

  async createUser(createBody: CreateUsersDto): Promise<CreateUsersDto> {
    const newUser = {
      id: createBody.id,
      login: createBody.login,
      password: createBody.password,
    };

    const createUser = await this.usersRepository.createUsers(newUser);
    return createUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.usersRepository.deleteUser(id);
  }
}

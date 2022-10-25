import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Users } from 'src/infrastructure/dbSQL';
import { DataSource } from 'typeorm';
import { CreateUsersDto, ReturnUsers } from './users.types';

@Injectable()
export class UsersRepositoryTypeORM {
  constructor(@InjectDataSource() public dataSource: DataSource) {}

  async createUsers(createBody: CreateUsersDto): Promise<CreateUsersDto> {
    const newUser = await this.dataSource
      .getRepository(Users)
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({
        login: createBody.login,
        password: createBody.password,
      })
      .returning('*')
      .execute();

    return newUser.generatedMaps[0] as CreateUsersDto;
  }

  async deleteUser(id: string): Promise<boolean> {
    const isDeleted = await this.dataSource
      .getRepository(Users)
      .createQueryBuilder()
      .delete()
      .from('users')
      .where('users.id = :id', { id })
      .execute();

    return isDeleted.affected === 1;
  }

  async getAllUsers(): Promise<ReturnUsers[]> {
    const allUsers = await this.dataSource
      .getRepository(Users)
      .createQueryBuilder('users')
      .getMany();

    const users = allUsers.map((u) => ({
      id: u.id,
      login: u.login,
      password: u.password,
    }));

    return users;
  }
}

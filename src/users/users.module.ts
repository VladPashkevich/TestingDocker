import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/infrastructure/dbSQL';
import { UsersController } from './users.controller';
import { UsersRepositoryTypeORM } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepositoryTypeORM],
})
export class UsersModule {}

import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'login', type: 'varchar', nullable: false })
  login: string;
  @Column({ name: 'password', type: 'varchar', nullable: false })
  password: string;
}

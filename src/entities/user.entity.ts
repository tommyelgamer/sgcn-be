import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Championship } from './championship.entity';

enum ERoleName {
  SYS_ADMIN = 'SYS_ADMIN',
  CHAMPIONSHIP_ADMIN = 'CHAMPIONSHIP_ADMIN',
  OFFICE = 'OFFICE',
  JURY = 'JURY',
  RACE_OFFICER = 'RACE_OFFICER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @ManyToOne(() => Championship)
  @JoinColumn({
    name: 'user_championship_id',
  })
  championship: Championship;

  @Column({ name: 'user_championship_id' })
  championshipId: number;

  @Column({ name: 'user_username', unique: true })
  username: string;

  @Column({ name: 'user_password' })
  password: string;

  @Column({ name: 'user_role', enum: ERoleName })
  role: string;
}

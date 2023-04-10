import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Championship } from './championship.entity';
import { ERoleName } from 'src/enum/role.enum';

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
  role: ERoleName;
}

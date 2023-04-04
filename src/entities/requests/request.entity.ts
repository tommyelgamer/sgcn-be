import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Championship } from '../championship.entity';

@Entity()
export class Request {
  @PrimaryGeneratedColumn({ name: 'request_id' })
  id: number;

  @ManyToOne(() => Championship)
  @JoinColumn({ name: 'request_championship_id' })
  championship: Championship;

  @Column({ name: 'request_championship_id' })
  championshipId: number;
}

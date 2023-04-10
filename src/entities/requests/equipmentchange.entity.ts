import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Championship } from '../championship.entity';

@Entity()
export class EquipmentChange {
  @PrimaryGeneratedColumn({ name: 'equipmentchange_id' })
  id?: number;

  @OneToOne(() => Championship, { cascade: true })
  @JoinColumn({ name: 'audience_championship_id' })
  championship?: Championship;

  @Column({ name: 'audience_championship_id' })
  championshipId: number;
}

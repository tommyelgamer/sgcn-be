import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompetitorEntry } from './competitorentry.entity';

@Entity()
export class SailingClass {
  @PrimaryGeneratedColumn({ name: 'sailingclass_id' })
  id: number;

  @Column({ name: 'sailingclass_name' })
  name: string;

  @OneToMany(
    () => CompetitorEntry,
    (competitorEntry) => competitorEntry.sailingClass
  )
  @JoinColumn({ name: 'sailingclass_competitorentry_id' })
  competitorEntry: CompetitorEntry[];
}

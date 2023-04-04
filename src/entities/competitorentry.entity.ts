import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Championship } from './championship.entity';
import { SailingClass } from './sailingclass.entity';

@Entity()
export class CompetitorEntry {
  @PrimaryGeneratedColumn({ name: 'competitorentry_id' })
  id: number;

  @ManyToOne(() => Championship, (championship) => championship.competitorEntry)
  @JoinColumn({ name: 'competitorentry_championship_id' })
  championship: Championship;

  @Column({ name: 'competitorentry_championship_id' })
  championshipId: number;

  @ManyToOne(
    () => SailingClass,
    (sailingClass) => sailingClass.competitorEntry,
    { cascade: false }
  )
  @JoinColumn({ name: 'competitorentry_sailingclass_id' })
  sailingClass: SailingClass;

  @Column({ name: 'competitorentry_sailingclass_id' })
  sailingClassId: number;
}

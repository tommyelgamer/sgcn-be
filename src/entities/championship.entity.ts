import {
  Check,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { CompetitorEntry } from './competitorentry.entity';
import { Image } from './image.entity';
import { Result } from './result.entity';
import { SailingClass } from './sailingclass.entity';
import { Document } from './document.entity';
import { ChampionshipFeatures } from './championshipfeatures.entity';

@Entity()
export class Championship {
  @PrimaryGeneratedColumn({ name: 'championship_id' })
  id: number;

  @Column({ name: 'championship_code', unique: true })
  code: string;

  @OneToOne(() => Image, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({
    name: 'championship_icon',
  })
  icon?: Image;

  @OneToOne(() => Image, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({
    name: 'championship_banner',
  })
  banner?: Image;

  @Column({ name: 'championship_shortname' })
  shortname: string;

  @Column({ name: 'championship_longname' })
  longname: string;

  @OneToMany(
    () => CompetitorEntry,
    (competitorEntry) => competitorEntry.championship,
    { cascade: false, nullable: true },
  )
  @JoinColumn({ name: 'championship_competitorentry_id' })
  competitorEntry?: CompetitorEntry[];

  @ManyToMany(() => SailingClass, { cascade: false, nullable: true })
  @JoinTable()
  sailingclass?: SailingClass[];

  @Column({ name: 'championship_isactive', default: true })
  isActive: boolean;

  @OneToMany(() => Document, (document) => document.championship, {
    cascade: false,
    nullable: true,
  })
  @JoinColumn({ name: 'championship_document_id' })
  document?: Document[];

  @OneToMany(() => Result, (result) => result.championship, {
    cascade: false,
    nullable: true,
  })
  @JoinColumn({ name: 'championship_document_id' })
  result?: Result[];

  @OneToOne(() => ChampionshipFeatures, {
    cascade: true,
  })
  @JoinColumn({ name: 'championship_championshipfeatures_id' })
  championshipFeatures: ChampionshipFeatures;

  @Column({ name: 'championship_championshipfeatures_id' })
  championshipFeaturesId: number;
}

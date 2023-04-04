import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Attachment } from './attachment.entity';
import { Championship } from './championship.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn({ name: 'result_id' })
  id: number;

  @Column({ name: 'result_name' })
  class: string;

  @Column({ name: 'result_publishdate' })
  publishdate: string;

  @Column({ name: 'result_ishidden' })
  isHidden: boolean;

  @OneToOne(() => Attachment, {
    cascade: true,
  })
  @JoinColumn({ name: 'result_attachment_id' })
  attachment: Attachment;

  @ManyToOne(() => Championship)
  @JoinColumn({ name: 'result_championship_id' })
  championship: Championship;

  @Column({ name: 'result_championship_id' })
  championshipId: number;
}

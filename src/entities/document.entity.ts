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
export class Document {
  @PrimaryGeneratedColumn({ name: 'document_id' })
  id: number;

  @Column({ name: 'document_name' })
  title: string;

  @Column({ name: 'document_publishdate' })
  publishdate: string;

  @OneToOne(() => Attachment, {
    cascade: true,
  })
  @JoinColumn({ name: 'document_attachment_id' })
  attachment: Attachment;

  @ManyToOne(() => Championship)
  @JoinColumn({ name: 'document_championship_id' })
  championship?: Championship;

  @Column({ name: 'document_championship_id' })
  championshipId: number;
}

import {
  Check,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from './file.entity';

@Entity()
// Check that either url or file is define, but not both at the same time
@Check(
  '("attachment_file_id" IS NULL AND "attachment_url" IS NOT NULL) OR ("attachment_file_id" IS NOT NULL AND "attachment_url" IS NULL)',
)
export class Attachment {
  @PrimaryGeneratedColumn({ name: 'attachment_id' })
  id: number;

  @OneToOne(() => File, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({
    name: 'attachment_file_id',
  })
  file?: File;

  @Column({ name: 'attachment_file_id', nullable: true })
  fileId?: number;

  @Column({
    name: 'attachment_url',
    nullable: true,
  })
  url?: string;
}

import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { File } from './file.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn({ name: 'image_id' })
  id: number;

  @OneToOne(() => File, {
    cascade: true,
  })
  @JoinColumn({ name: 'image_file_id' })
  file: File;
}

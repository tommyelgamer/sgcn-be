import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn({ name: 'file_id' })
  id?: number;

  @Column({ name: 'file_filename' })
  fileName: string;

  @Column({ name: 'file_mimetype' })
  mimetype: string;

  @Column({ name: 'file_data', type: 'bytea' })
  data: Uint8Array;
}

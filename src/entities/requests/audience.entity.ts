import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Request } from './request.entity';

@Entity()
export class Audience {
  @PrimaryGeneratedColumn({ name: 'audience_id' })
  id: number;

  @OneToOne(() => Request, { cascade: true })
  @JoinColumn({ name: 'audience_request_id' })
  request: Request;
}

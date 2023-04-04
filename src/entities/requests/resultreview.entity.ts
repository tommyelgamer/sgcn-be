import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Request } from './request.entity';

@Entity()
export class ResultReview {
  @PrimaryGeneratedColumn({ name: 'resultreview_id' })
  id: number;

  @OneToOne(() => Request, { cascade: true })
  @JoinColumn({ name: 'resultreview_request_id' })
  request: Request;
}

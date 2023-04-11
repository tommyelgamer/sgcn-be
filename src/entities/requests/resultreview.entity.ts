import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Championship } from '../championship.entity';

@Entity()
export class ResultReview {
  @PrimaryGeneratedColumn({ name: 'resultreview_id' })
  id?: number;

  @OneToOne(() => Championship, { cascade: true })
  @JoinColumn({ name: 'audience_championship_id' })
  championship?: Championship;

  @Column({ name: 'audience_championship_id' })
  championshipId: number;

  @Column({ name: 'resultreview_requester', type: 'jsonb' })
  requester: {
    category: string;
    sailNumber: string;
  };

  @Column({ name: 'resultreview_racenumber' })
  raceNumber: string;

  @Column({ name: 'resultreview_actualresult' })
  actualResult: string;

  @Column({ name: 'resultreview_requestedresult' })
  requestedResult: string;

  @Column({ name: 'resultreview_requestText' })
  requestText?: string;

  @Column({ name: 'resultreview_status', type: 'jsonb' })
  status: {
    status: string;
    comment?: string;
    date: string;
  }[];
}

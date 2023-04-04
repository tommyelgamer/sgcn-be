import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Request } from './request.entity';

@Entity()
export class EquipmentChange {
  @PrimaryGeneratedColumn({ name: 'equipmentchange_id' })
  id: number;

  @OneToOne(() => Request, { cascade: true })
  @JoinColumn({ name: 'equipmentchange_request_id' })
  request: Request;
}

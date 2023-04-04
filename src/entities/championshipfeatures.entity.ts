import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChampionshipFeatures {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'championshipfeatures_audience_is_enabled', default: true })
  audienceIsEnabled: boolean;

  @Column({
    name: 'championshipfeatures_resultreview_is_enabled',
    default: true,
  })
  resultreviewIsEnabled: boolean;

  @Column({
    name: 'championshipfeatures_equipmentchange_is_enabled',
    default: false,
  })
  equipmentchangeIsEnabled: boolean;

  @Column({ name: 'championshipfeatures_rule42_is_enabled', default: false })
  rule42IsEnabled: boolean;

  @Column({
    name: 'championshipfeatures_declarations_is_enabled',
    default: false,
  })
  declarationsIsEnabled: boolean;
}

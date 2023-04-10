import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Championship } from '../championship.entity';

@Entity()
export class Audience {
  @PrimaryGeneratedColumn({ name: 'audience_id' })
  id?: number;

  @OneToOne(() => Championship, { cascade: true })
  @JoinColumn({ name: 'audience_championship_id' })
  championship?: Championship;

  @Column({ name: 'audience_championship_id' })
  championshipId: number;

  @Column({ name: 'audience_type' })
  type: string;

  @Column({ name: 'audience_requester', type: 'jsonb' })
  requester: {
    category: string;
    sailNumber: string;
  };

  @Column({ name: 'audience_participants', type: 'jsonb' })
  participants: {
    category: string;
    sailNumber: string;
  }[];

  @Column({ name: 'audience_incident', type: 'jsonb' })
  incident: {
    raceDate: string;
    raceNumber: number;
    dateTime: string;
    infringedRules: string;
    witnesses: {
      category: string;
      sailNumber: string;
    }[];
  };

  @Column({ name: 'audience_informed', type: 'jsonb' })
  informed: {
    hail: {
      hailed: boolean;
      situation: string;
      wordsUsed: string;
    };
    flagDisplayed: {
      flagDisplayed: boolean;
      situation: string;
    };
    informedOtherWay: {
      informedOtherWay: boolean;
      situation: string;
    };
  };

  @Column({ name: 'audience_description' })
  description: string;

  @Column({ name: 'audience_status', type: 'jsonb' })
  status: [
    {
      status: string;
      comment?: string;
      resolution?: AudienceResolution;
      date: string;
    },
  ];
}

export class AudienceResolution {
  isRetired?: boolean;

  timeLimit?: {
    timeLimit: string;
    presentedOnTime: boolean;
    presentationWindowExpanded: boolean;
  };

  participants?: {
    requesterRepresentedBy: string;
    protesteesRepresentedBy: string;
    witnesses: string;
    interpreters: string;
  };

  validity?: {
    interestedPartyObjected: {
      checked: boolean;
      observation: string;
    };
    theWrittenDeclarationDescribesTheIncident: {
      checked: boolean;
      observation: string;
    };
    hailedOutLoud: {
      checked: boolean;
      observation: string;
    };
    advicedAtFirstReasonableOpportunity: {
      checked: boolean;
      observation: string;
    };
    redFlagWasDisplayedAtFirstOpportunity: {
      checked: boolean;
      observation: string;
    };
    redFlagWasSeenByRaceCommitee: {
      checked: boolean;
      observation: string;
    };
    isValid: boolean;
  };

  provedFacts?: string;

  conclusionAndRulesThatApply?: string;

  resolution?: string;

  shortResolution?: string;

  juryParticipants: string;
}

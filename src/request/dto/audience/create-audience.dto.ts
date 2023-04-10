import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

enum AudienceType {
  'protest-b2b' = 'protest-b2b',
  'protest-rc2b' = 'protest-rc2b',
  'protest-pc2b' = 'protest-pc2b',
  'redress-by-boat-or-rc' = 'redress-by-boat-or-rc',
  'redress-by-pc' = 'redress-by-pc',
  'reopen-by-boat' = 'reopen-by-boat',
  'reopen-by-pc' = 'reopen-by-pc',
}

class AudienceParticipant {
  @IsString()
  category: string;

  @IsString()
  sailNumber: string;
}

class Incident {
  @IsString()
  raceDate: string;

  @IsNumber()
  raceNumber: number;

  @IsString()
  dateTime: string;

  @IsString()
  infringedRules: string;

  @IsArray()
  @ArrayMinSize(0)
  @Type(() => AudienceParticipant)
  witnesses: AudienceParticipant[];
}

class Hail {
  @IsBoolean()
  hailed: boolean;

  @IsString()
  situation: string;

  @IsString()
  wordsUsed: string;
}

class FlagDisplayed {
  @IsBoolean()
  flagDisplayed: boolean;

  @IsString()
  situation: string;
}

class InformedOtherWay {
  @IsBoolean()
  informedOtherWay: boolean;

  @IsString()
  situation: string;
}

class Informed {
  @Type(() => Hail)
  hail: Hail;

  @Type(() => FlagDisplayed)
  flagDisplayed: FlagDisplayed;

  @Type(() => InformedOtherWay)
  informedOtherWay: InformedOtherWay;
}

export class CreateAudienceDto {
  @IsEnum(AudienceType)
  type: string;

  @ValidateNested({ each: true })
  @Type(() => AudienceParticipant)
  requester: AudienceParticipant;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => AudienceParticipant)
  participants: AudienceParticipant[];

  @Type(() => Incident)
  incident: Incident;

  @Type(() => Informed)
  informed: Informed;

  @IsString()
  description: string;
}

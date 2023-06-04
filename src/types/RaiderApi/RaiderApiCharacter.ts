import { Faction } from '../enums/Faction'
import { Gender } from '../enums/Gender'
import { Region } from '../enums/Region'
import { Role } from '../enums/Role'
import { RaiderApiDungeon } from './RaiderApiDungeon'
import { RaiderApiScores } from './RaiderApiScores'

export interface RaiderApiCharacter {
	name: string
  race: string
  class: string
  active_spec_name: string
  active_spec_role: Role
  gender: Gender
  faction: Faction
  achievement_points: number
  honorable_kills: number
  thumbnail_url: string
  region: Region
  realm: string
  last_crawled_at: string // ISO8601
  profile_url: string
  profile_banner: string
	mythic_plus_best_runs: RaiderApiDungeon[]
	mythic_plus_alternate_runs: RaiderApiDungeon[]
	mythic_plus_scores_by_season: RaiderApiScores[]
}

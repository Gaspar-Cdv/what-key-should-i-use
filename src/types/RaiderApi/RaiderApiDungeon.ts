import { RaiderApiDungeonAffix } from './RaiderApiDungeonAffix'
import { FirstAffix } from '../enums/FirstAffix'

export interface RaiderApiDungeon {
	dungeon: string
	short_name: string
	mythic_level: number
	completed_at: string // ISO8601
	clear_time_ms: number
	par_time_ms: number
	num_keystone_upgrades: number
	map_challenge_mode_id: number
	zone_id: number
	score: number
	affixes: [RaiderApiDungeonAffix<FirstAffix>, ...RaiderApiDungeonAffix[]]
	url: string
}

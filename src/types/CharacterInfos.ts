import { DungeonId } from './enums/DungeonId'
import { FirstAffix } from './enums/FirstAffix'
import { Gender } from './enums/Gender'
import { Role } from './enums/Role'

export interface AffixInfos {
	affix: FirstAffix
	level: number
	score: number
	time: number
	keyUpgrades: number
}

export type DungeonInfos = {
	id: DungeonId
	name: string
	maxTime: number
	affixes: {
		[key in FirstAffix]: AffixInfos
	}
}

export type CharacterInfos = {
	name: string
	race: string
	gender: Gender
	class: string
	spec: string
	role: Role
	avatar: string
	totalScore: number
	dungeons: {
		[key in DungeonId]: DungeonInfos
	}
}
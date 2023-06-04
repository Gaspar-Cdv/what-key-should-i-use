import { MythicDungeon } from './MythicDungeon'
import { Faction } from './enums/Faction'
import { Gender } from './enums/Gender'
import { Role } from './enums/Role'

export type CharacterInfos = {
	name: string
	race: string
	gender: Gender
	class: string
	spec: string
	role: Role
	faction: Faction
	avatar: string
	totalScore: number
	dungeons: MythicDungeon[]
}

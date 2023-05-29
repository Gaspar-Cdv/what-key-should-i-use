import { MythicDungeon } from './MythicDungeon'
import { Gender } from './enums/Gender'
import { Role } from './enums/Role'

export type CharacterInfos = {
	name: string
	race: string
	gender: Gender
	class: string
	spec: string
	role: Role
	avatar: string
	totalScore: number
	dungeons: MythicDungeon[]
}

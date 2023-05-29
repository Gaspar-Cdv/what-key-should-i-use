import { FirstAffix } from './enums/FirstAffix'

export interface Dungeon {
	name: string
	shortName: string
}

export type MythicDungeon = Dungeon & {
	maxTime?: number
	runs: [
		MythicDungeonRun<FirstAffix.TYRANNICAL>,
		MythicDungeonRun<FirstAffix.FORTIFIED>
	]
}

export interface MythicDungeonRun<T extends FirstAffix = FirstAffix> extends Dungeon {
	affix: T
	level: number
	time?: number
	score: number
	keyUpgrades?: number
}

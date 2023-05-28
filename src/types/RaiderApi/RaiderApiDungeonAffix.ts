import { FirstAffix } from '../enums/FirstAffix'

export interface RaiderApiDungeonAffix<T extends string | FirstAffix = string> {
	id: number
	name: T
	description: string
	icon: string
	wowhead_url: string
}

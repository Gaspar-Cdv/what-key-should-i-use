import { Region } from '../enums/Region'

export interface RaiderApiStaticData {
	seasons: RaiderApiSeason[]
	dungeons: RaiderApiDungeon[]
}

export interface RaiderApiSeason {
	slug: string
	name: string
	short_name: string
	seasonal_affix: {
		id: number
		name: string
		icon: string
	}
	starts: {
		[key in Region]: string // ISO8601
	}
	ends: {
		[key in Region]: string // ISO8601
	}
	dungeons: RaiderApiDungeon[]
}

interface RaiderApiDungeon {
	id: number
	challenge_mode_id: number
	slug: string,
	name: string
	short_name: string
}

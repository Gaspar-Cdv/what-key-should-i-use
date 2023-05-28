import { FirstAffix } from '../enums/FirstAffix'
import { Region } from '../enums/Region'

interface AffixDetail<T extends string | FirstAffix = string> {
	id: number
	name: T
	description: string
	icon: string
	wowhead_url: string
}

export interface RaiderApiCurrentAffixes {
  region: Region
  title: string
  leaderboard_url: string
  affix_details: [AffixDetail<FirstAffix>, ...AffixDetail[]]
}

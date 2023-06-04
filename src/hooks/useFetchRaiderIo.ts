import { useState } from 'react'
import { mythicDungeonService } from '../services/MythicDungeonService'
import { raiderIoApi } from '../services/RaiderIoApi'
import { CharacterInfos } from '../types/CharacterInfos'
import { CharacterRequest } from '../types/CharacterRequest'
import { Dungeon } from '../types/MythicDungeon'
import { FirstAffix } from '../types/enums/FirstAffix'
import { Region } from '../types/enums/Region'
import { RaiderApiError } from '../types/errors/RaiderApiError'
import { RaiderApiScoreTiers } from '../types/RaiderApi/RaiderApiScoreTiers'

interface DungeonStaticData {
	mythicDungeons: Dungeon[]
	weeklyAffix?: FirstAffix
	scoreTiers: RaiderApiScoreTiers[]
}

const formatError = (e: unknown) => e instanceof RaiderApiError ? e.message : 'Unknown error. Please try again.'

export const useFetchStaticData = (region: Region) => {
	return useFetch<DungeonStaticData>(async () => {
		const fetchCurrentSeasonDungeons = async () => {
			const staticData = await raiderIoApi.fetchStaticData()
			return mythicDungeonService.convertToDungeons(staticData, region)
		}

		const fetchWeeklyAffix = async () => {
			const currentAffixes = await raiderIoApi.fetchAffixes(region)
			return currentAffixes.affix_details[0].name
		}

		return await Promise.all([fetchCurrentSeasonDungeons(), fetchWeeklyAffix(), raiderIoApi.fetchScoreTiers()])
			.then(([mythicDungeons, weeklyAffix, scoreTiers]) => ({
				mythicDungeons,
				weeklyAffix,
				scoreTiers
			}))
	},
		{ mythicDungeons: [], scoreTiers: [] },
		formatError
	)
}

export const useFetchCharacterInfos = ({ region, realm, name }: CharacterRequest, currentSeasonDungeons: Dungeon[]) => {
	return useFetch<CharacterInfos | undefined>(async () => {
		const raiderApiCharacter = await raiderIoApi.fetchCharacterProfile({ region, realm, name })
		return mythicDungeonService.convertToCharacterInfos(raiderApiCharacter, currentSeasonDungeons)
	},
		undefined,
		formatError
	)
}

const useFetch = <T> (
	callback: () => Promise<T>,
	defaultValue: T,
	formatError: (e: unknown) => string = e => (e as Error).message,
) => {
	const [data, setData] = useState<T>(defaultValue)

	const [pending, setPending] = useState(false)
	const [error, setError] = useState<string>()

	const handler = async () => {
		setPending(true)

		try {
			const result = await callback()
			setData(result)
			setError(undefined)
		} catch (e) {
			console.error(e)
			setError(formatError(e))
		}

		setPending(false)
	}

	return [data, handler, error, pending] as const
}

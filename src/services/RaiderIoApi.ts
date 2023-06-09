import { CharacterRequest } from '../types/CharacterRequest'
import { RaiderApiCharacter } from '../types/RaiderApi/RaiderApiCharacter'
import { RaiderApiCurrentAffixes } from '../types/RaiderApi/RaiderApiCurrentAffixes'
import { RaiderApiErrorResponse } from '../types/RaiderApi/RaiderApiErrorResponse'
import { RaiderApiScoreTiers } from '../types/RaiderApi/RaiderApiScoreTiers'
import { RaiderApiStaticData } from '../types/RaiderApi/RaiderApiStaticData'
import { Region } from '../types/enums/Region'
import { RaiderApiError } from '../types/errors/RaiderApiError'

const DRAGONFLIGHT_ID = '9'

class RaiderIoApi {
	fetchCharacterProfile = async (params: CharacterRequest): Promise<RaiderApiCharacter> => {
		return this.call('/characters/profile', {
			...params,
			fields: [
				'mythic_plus_best_runs',
				'mythic_plus_alternate_runs',
				'mythic_plus_scores_by_season:current'
			].join(',')
		})
	}

	fetchAffixes = async (region: Region): Promise<RaiderApiCurrentAffixes> => {
		return this.call('/mythic-plus/affixes', {
			region,
			locale: 'en'
		})
	}

	fetchStaticData = async (): Promise<RaiderApiStaticData> => {
		return this.call('/mythic-plus/static-data', {
			expansion_id: DRAGONFLIGHT_ID
		})
	}

	fetchScoreTiers = async (): Promise<RaiderApiScoreTiers[]> => {
		return this.call('/mythic-plus/score-tiers')
	}

	private call = async <T>(path: string, params?: Record<string, string>): Promise<T> => {
		try {
			const url = this.getUrl(path, params)
			const data = await fetch(url)

			if (!data.ok) {
				const error: RaiderApiErrorResponse = await data.json()
				throw new RaiderApiError(error.message, error.statusCode)
			}

			return data.json()
		} catch (e) {
			if (!(e instanceof RaiderApiError)) {
				console.error(e)
			}

			throw e
		}
	}

	private getUrl = (path: string, params?: Record<string, string>): string => {
		const url = new URL(`https://raider.io/api/v1${path}`)

		if (params != null) {
			Object.keys(params).forEach(key => {
				url.searchParams.append(key, params[key])
			})
		}

		return url.href
	}
	
}

export const raiderIoApi = new RaiderIoApi()

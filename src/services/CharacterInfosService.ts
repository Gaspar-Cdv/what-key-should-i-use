import { CharacterInfos } from '../types/CharacterInfos'
import { CharacterRequest } from '../types/CharacterRequest'
import { RaiderApiCharacter } from '../types/RaiderApi/RaiderApiCharacter'
import { raiderApi } from './RaiderApi'

class CharacterInfosService {
	get = async (params: CharacterRequest): Promise<CharacterInfos> => {
		const raiderApiCharacter = await raiderApi.fetchCharacterProfile(params)
		return this.convertToCharacterInfos(raiderApiCharacter)
	}

	private convertToCharacterInfos = (raiderApiCharacter: RaiderApiCharacter): CharacterInfos => {
		const {
			name,
			race,
			gender,
			class: character_class,
			active_spec_name,
			active_spec_role,
			thumbnail_url,
			mythic_plus_best_runs,
			mythic_plus_alternate_runs,
			mythic_plus_scores_by_season
		} = raiderApiCharacter

		const characterInfos = {
			name,
			race,
			gender,
			class: character_class,
			spec: active_spec_name,
			role: active_spec_role,
			avatar: thumbnail_url,
			totalScore: mythic_plus_scores_by_season[0].scores.all
		} as CharacterInfos

		const allRuns = mythic_plus_best_runs.concat(mythic_plus_alternate_runs)

		return allRuns.reduce((characterInfos, run) => {
			const { short_name, dungeon, affixes, score, mythic_level, clear_time_ms, par_time_ms } = run
			const affix = affixes[0].name

			return {
				...characterInfos,
				dungeons: {
					...characterInfos.dungeons,
					[short_name]: {
						...characterInfos.dungeons?.[short_name] ?? {
							id: short_name,
							name: dungeon,
							maxTime: par_time_ms
						},
						affixes: {
							...characterInfos.dungeons?.[short_name]?.affixes,
							[affix]: {
								affix,
								level: mythic_level,
								score,
								time: clear_time_ms,
								isTimed: clear_time_ms < par_time_ms
							}
						}
					}
				}
			}
		}, characterInfos)
	}
}

export const characterInfosService = new CharacterInfosService()

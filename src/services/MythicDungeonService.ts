import { CharacterInfos } from '../types/CharacterInfos'
import { Dungeon, MythicDungeon } from '../types/MythicDungeon'
import { RaiderApiCharacter } from '../types/RaiderApi/RaiderApiCharacter'
import { RaiderApiSeason, RaiderApiStaticData } from '../types/RaiderApi/RaiderApiStaticData'
import { FirstAffix } from '../types/enums/FirstAffix'
import { Region } from '../types/enums/Region'

class MythicDungeonService {
	convertToDungeons = (staticData: RaiderApiStaticData, region: Region): Dungeon[] => {
		const activeSeason = staticData.seasons.find(this.byActiveSeason(region))
		return activeSeason?.dungeons.map(({ name, short_name }) => ({ name, shortName: short_name })) ?? []
	}

	convertToCharacterInfos = (raiderApiCharacter: RaiderApiCharacter, currentSeasonDungeons: Dungeon[]): CharacterInfos => {
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

		const characterInfos: CharacterInfos = {
			name,
			race,
			gender,
			class: character_class,
			spec: active_spec_name,
			role: active_spec_role,
			avatar: thumbnail_url,
			totalScore: mythic_plus_scores_by_season[0].scores.all,
			dungeons: this.initialiseMythicDungeons(currentSeasonDungeons!)
		}

		const allRuns = mythic_plus_best_runs.concat(mythic_plus_alternate_runs)

		allRuns.forEach(({ short_name, dungeon, affixes: [{ name: affix }], score, mythic_level, clear_time_ms, par_time_ms, num_keystone_upgrades }) => {
			const mythicDungeon = characterInfos.dungeons.find(dungeon => dungeon.shortName == short_name)

			if (mythicDungeon == null) {
				throw new Error(`Dungeon ${dungeon} was not found in ${JSON.stringify(characterInfos.dungeons.map(dungeon => dungeon.name))}`)
			}

			mythicDungeon.maxTime = par_time_ms

			const mythicDungeonRun = mythicDungeon.runs.find(run => run.affix === affix)

			if (mythicDungeonRun == null) {
				throw new Error(`Affix ${affix} was not found in ${JSON.stringify(mythicDungeon.runs.map(run => run.affix))}`)
			}

			mythicDungeonRun.time = clear_time_ms
			mythicDungeonRun.score = score
			mythicDungeonRun.level = mythic_level
			mythicDungeonRun.keyUpgrades = num_keystone_upgrades
		})

		return characterInfos

		// return allRuns.reduce((characterInfos, run) => {
		// 	const { short_name, dungeon, affixes: [{ name: affix }], score, mythic_level, clear_time_ms, par_time_ms, num_keystone_upgrades } = run
		// 	const dungeonInfos = characterInfos.dungeons.find(dungeon => dungeon.shortName == short_name)

		// 	const mythicDungeonRun: MythicDungeonRun = {
		// 		name: dungeon,
		// 		shortName: short_name,
		// 		affix,
		// 		level: mythic_level,
		// 		score,
		// 		time: clear_time_ms,
		// 		keyUpgrades: num_keystone_upgrades
		// 	}

		// 	if (dungeonInfos == null) {
		// 		const mythicDungeon = {
		// 			name: dungeon,
		// 			shortName: short_name,
		// 			maxTime: par_time_ms,
		// 			runs: [mythicDungeonRun]
		// 		}

		// 		characterInfos.dungeons.push(mythicDungeon as MythicDungeon)
		// 	} else {
		// 		dungeonInfos.runs.push(mythicDungeonRun)
		// 	}

		// 	return characterInfos
		// }, characterInfos)
	}

	private byActiveSeason = (region: Region) => {
		return (season: RaiderApiSeason) => {
			const now = Date.now()
			const start = new Date(season.starts[region]).getTime()
			const end = season.ends[region] != null ? new Date(season.ends[region]).getTime() : null

			return start < now && (end == null || end > now)
		}
	}

	private initialiseMythicDungeons = (dungeons: Dungeon[]): MythicDungeon[] => {
		return dungeons.map(({ name, shortName }) => ({
			name,
			shortName,
			runs: [
				{ name, shortName, affix: FirstAffix.TYRANNICAL, level: 0, score: 0 },
				{ name, shortName, affix: FirstAffix.FORTIFIED, level: 0, score: 0 }
			]
		}))
	}
}

export const mythicDungeonService = new MythicDungeonService()

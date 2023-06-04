import { CharacterInfos } from '../../../types/CharacterInfos'
import { MythicDungeonRun } from '../../../types/MythicDungeon'
import { FirstAffix } from '../../../types/enums/FirstAffix'
import PremadeGroupFilter from './PremadeGroupFilter'
import WeeklyAffix from './WeeklyAffix'
import Section from '../../common/Section'
import Table from '../../common/Table'
import KeyPrioritiesHeaders from './KeyPriorityHeaders'
import KeyPrioritiesRow from './KeyPriorityRow'

interface KeyPrioritiesProps {
	weeklyAffix: FirstAffix
	characterInfos: CharacterInfos
}

function KeyPriorities ({ characterInfos, weeklyAffix }: KeyPrioritiesProps) {
	const currentDungeonsScores = characterInfos.dungeons.map(dungeon => dungeon.runs.find(run => run.affix === weeklyAffix)?.score ?? 0)

	const min = characterInfos.dungeons.length > 0 ? Math.min(...currentDungeonsScores) : 0
	const max = characterInfos.dungeons.length > 0 ? Math.max(...currentDungeonsScores) : 0

	const priorities: MythicDungeonRun[] = characterInfos.dungeons
		.flatMap(dungeon => dungeon.runs.filter(run => run.affix === weeklyAffix))
		.filter(run => run.score <= (max + min) / 2)
		.sort((a, b) => a.score - b.score)

	return (
		<>
			<Section title='Key priorities'>
				<WeeklyAffix weeklyAffix={weeklyAffix} />

				<Table headers={<KeyPrioritiesHeaders />}>
					{priorities.map((priority, index) => (
						<KeyPrioritiesRow
							key={priority.name}
							dungeon={priority}
							index={index + 1}
							currentDungeonsScores={currentDungeonsScores}
						/>
					))}
				</Table>
			</Section>


			<Section title='Premade Group Filter'>
				<PremadeGroupFilter
					role={characterInfos.role}
					totalScore={characterInfos.totalScore}
					shortNames={priorities.map(priority => priority.shortName)}
				/>
			</Section>
			
		</>
	)
}

export default KeyPriorities

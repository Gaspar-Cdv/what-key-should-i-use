import { CharacterInfos } from '../../../types/CharacterInfos'
import { FirstAffix } from '../../../types/enums/FirstAffix'
import MythicOverviewHeaders from './MythicOverviewHeaders'
import MythicOverviewRow from './MythicOverviewRow'
import { useCallback } from 'react'
import Table from '../../common/Table'

export const byTyrannicalFirst = (a: FirstAffix, b: FirstAffix) => a === FirstAffix.TYRANNICAL ? -1 : b === FirstAffix.TYRANNICAL ? 1 : 0

export function byTyrannicalFirsts<T> (getter: (item: T) => FirstAffix) {
	return (a: T, b: T) => getter(a) === FirstAffix.TYRANNICAL ? -1 : getter(b) === FirstAffix.TYRANNICAL ? 1 : 0
}

interface MythicOverviewTableProps {
	characterInfos: CharacterInfos
}

function MythicOverview ({ characterInfos }: MythicOverviewTableProps) {
	const getAllScoresByAffix = useCallback((affix: FirstAffix) => {
		return characterInfos?.dungeons
			.flatMap(dungeon => dungeon.runs.filter(run => run.affix === affix))
			.filter(run => run.time != null)
			.map(run => run.score) ?? []
	}, [characterInfos])

	return (
		<Table
			headers={<MythicOverviewHeaders />}
			fixedColumns
		>
			{characterInfos.dungeons
				.sort((a, b) => a.name.localeCompare(b.name))
				.map(dungeon => (
					<MythicOverviewRow
						key={dungeon.shortName}
						dungeon={dungeon}
						getAllScoresByAffix={getAllScoresByAffix}
					/>
				))
			}
		</Table>
	)
}

export default MythicOverview

import { useCallback } from 'react'
import { useSort } from '../../../hooks/useSort'
import { CharacterInfos } from '../../../types/CharacterInfos'
import { MythicDungeon } from '../../../types/MythicDungeon'
import { FirstAffix } from '../../../types/enums/FirstAffix'
import Table from '../../common/Table'
import MythicOverviewHeaders, { ColumnName } from './MythicOverviewHeaders'
import MythicOverviewRow from './MythicOverviewRow'

const sortBy = (affix: FirstAffix) => {
	return (a: MythicDungeon, b: MythicDungeon) => {
		const runA = a.runs.find(run => run.affix === affix)
		const runB = b.runs.find(run => run.affix === affix)
		return (runA?.score ?? 0) - (runB?.score ?? 0)
			|| (runA?.time ?? 0) - (runB?.time ?? 0)
	}
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

	const [sortCallback, toggleColumn, orderState, activeColumn] = useSort<ColumnName, MythicDungeon>('Dungeon', {
		Dungeon: (a, b) => a.name.localeCompare(b.name),
		Tyrannical: sortBy(FirstAffix.TYRANNICAL),
		Fortified: sortBy(FirstAffix.FORTIFIED)
	})

	return (
		<Table
			headers={(
				<MythicOverviewHeaders
					toggleColumn={toggleColumn}
					orderState={orderState}
					activeColumn={activeColumn}
				/>
			)}
			fixedColumns
		>
			{characterInfos.dungeons
				.sort(sortCallback)
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

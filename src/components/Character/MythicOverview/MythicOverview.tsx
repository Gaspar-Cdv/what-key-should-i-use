import { createUseStyles } from 'react-jss'
import { CharacterInfos } from '../../../types/CharacterInfos'
import { FirstAffix } from '../../../types/enums/FirstAffix'
import MythicOverviewHeaders from './MythicOverviewHeaders'
import MythicOverviewRow from './MythicOverviewRow'
import { useCallback } from 'react'

const useStyles = createUseStyles({
	table: {
		tableLayout: 'fixed',
		width: '100%',
		color: 'white',
		backgroundColor: '#000',
		borderCollapse: 'collapse',
		'& td,th': {
			border: '1px solid  #333',
			padding: [15, 20]
		}
	}
})

export const byTyrannicalFirst = (a: FirstAffix, b: FirstAffix) => a === FirstAffix.TYRANNICAL ? -1 : b === FirstAffix.TYRANNICAL ? 1 : 0

export function byTyrannicalFirsts <T> (getter: (item: T) => FirstAffix) {
	return (a: T, b: T) => getter(a) === FirstAffix.TYRANNICAL ? -1 : getter(b) === FirstAffix.TYRANNICAL ? 1 : 0
}

interface MythicOverviewProps {
	characterInfos: CharacterInfos
}

function MythicOverview ({ characterInfos }: MythicOverviewProps) {
	const classes = useStyles()

	const getAllScoresByAffix = useCallback((affix: FirstAffix) => {
		return characterInfos?.dungeons
			.flatMap(dungeon => dungeon.runs.filter(run => run.affix === affix))
			.filter(run => run.time != null)
			.map(run => run.score) ?? []
	}, [characterInfos])

	return (
		<table className={classes.table}>
			<MythicOverviewHeaders />
			<tbody>
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
			</tbody>
		</table>
	)
}

export default MythicOverview

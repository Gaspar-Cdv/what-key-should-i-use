import { MythicDungeon } from '../../../types/MythicDungeon'
import { FirstAffix } from '../../../types/enums/FirstAffix'
import { byTyrannicalFirst } from './MythicOverviewTable'
import MythicOverviewTableCell from './MythicOverviewTableCell'
import DungeonCell from '../../common/DungeonCell'

interface MythicOverviewTableRowProps {
	dungeon: MythicDungeon
	getAllScoresByAffix: (affix: FirstAffix) => number[]
}

function MythicOverviewTableRow ({ dungeon, getAllScoresByAffix }: MythicOverviewTableRowProps) {
	return (
		<tr>
			<DungeonCell dungeon={dungeon} />

			{Object.values(FirstAffix)
				.sort(byTyrannicalFirst)
				.map(affix => (
					<MythicOverviewTableCell
						key={`${dungeon.shortName}-${affix}`}
						dungeon={dungeon}
						affix={affix}
						getAllScoresByAffix={getAllScoresByAffix}
					/>
				))
			}
		</tr>
	)
}

export default MythicOverviewTableRow

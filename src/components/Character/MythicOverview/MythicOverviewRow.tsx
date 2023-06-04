import { MythicDungeon } from '../../../types/MythicDungeon'
import { FirstAffix } from '../../../types/enums/FirstAffix'
import MythicOverviewCell from './MythicOverviewCell'
import DungeonCell from '../../common/DungeonCell'

const byTyrannicalFirst = (a: FirstAffix, b: FirstAffix) => a === FirstAffix.TYRANNICAL ? -1 : b === FirstAffix.TYRANNICAL ? 1 : 0

interface MythicOverviewRowProps {
	dungeon: MythicDungeon
	getAllScoresByAffix: (affix: FirstAffix) => number[]
}

function MythicOverviewRow ({ dungeon, getAllScoresByAffix }: MythicOverviewRowProps) {
	return (
		<tr>
			<DungeonCell dungeon={dungeon} />

			{Object.values(FirstAffix)
				.sort(byTyrannicalFirst)
				.map(affix => (
					<MythicOverviewCell
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

export default MythicOverviewRow

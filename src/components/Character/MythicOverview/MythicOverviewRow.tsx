import { MythicDungeon } from '../../../types/MythicDungeon'
import { FirstAffix } from '../../../types/enums/FirstAffix'
import { byTyrannicalFirst } from './MythicOverview'
import MythicOverviewCell from './MythicOverviewCell'
import DungeonCell from '../../common/DungeonCell'

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

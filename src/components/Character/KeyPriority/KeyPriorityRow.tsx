import { createUseStyles } from 'react-jss'
import { MythicDungeonRun } from '../../../types/MythicDungeon'
import { COLOR_PANEL, getColor } from '../../../utils/stringUtils'
import DungeonCell from '../../common/DungeonCell'

interface JSSProps {
	color?: string
}

const useStyles = createUseStyles({
	bonus: ({ color }: JSSProps) => ({ color }),
	keyUpgrade: {
		color: 'grey'
	}
})

interface KeyPrioritiesRowProps {
	dungeon: MythicDungeonRun
	index: number
	currentDungeonsScores: number[]
}

function KeyPrioritiesRow ({ dungeon, index, currentDungeonsScores }: KeyPrioritiesRowProps) {
	const { score, keyUpgrades, level } = dungeon
	const classes = useStyles({
		color: getColor(currentDungeonsScores, score, [...COLOR_PANEL].reverse())
	})

	const max = Math.max(...currentDungeonsScores) ?? 0

	const isUpgradable = keyUpgrades != null && keyUpgrades < 3 && level > 0 && score > 0

	return (
		<tr>
			<td>{index}.</td>

			<DungeonCell dungeon={dungeon} />

			<td>
				+{Math.max(2, score > 0 ? level + 1 : 0)} minimum
				{isUpgradable && (
					<div className={classes.keyUpgrade}>or a +{level} and upgrade to +{keyUpgrades + 1}</div>
				)}
			</td>

			<td>
				{score}
				{max - score > 0 && (
					<> (<span className={classes.bonus}>+{(max - score).toFixed(1)}</span>)</>
				)}
			</td>
		</tr>
	)
}

export default KeyPrioritiesRow

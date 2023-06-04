import { createUseStyles } from 'react-jss'
import { ReactComponent as ClockIcon } from '../../../images/clock.svg'
import { MythicDungeon } from '../../../types/MythicDungeon'
import { FirstAffix } from '../../../types/enums/FirstAffix'
import { COLOR_PANEL, formatTime, getColor } from '../../../utils/stringUtils'
import ProgressBar from '../../common/ProgressBar'

interface JSSProps {
	keyColor?: string
	timeColor?: string
}

const useStyles = createUseStyles({
	cell: {
		color: '#666666',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		gap: 10
	},
	infos: ({ keyColor }: JSSProps) => ({
		color: keyColor,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-end',
		gap: 10
	}),
	score: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	time: ({ timeColor }: JSSProps) => ({
		color: timeColor,
		fontSize: 14,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 10
	}),
	clock: {
		display: 'flex',
		alignItems: 'center',
		gap: 5
	}
})

interface MythicOverviewTableCellProps {
	dungeon: MythicDungeon
	affix: FirstAffix
	getAllScoresByAffix: (affix: FirstAffix) => number[]
}

function MythicOverviewTableCell ({ dungeon, affix, getAllScoresByAffix }: MythicOverviewTableCellProps) {
	const dungeonRun = dungeon.runs.find(run => run.affix === affix)!
	const keyColor = dungeonRun.time != null ? getColor(getAllScoresByAffix(affix), dungeonRun.score) : undefined
	const timeColor = dungeonRun.keyUpgrades != null ? COLOR_PANEL[dungeonRun.keyUpgrades] : undefined
	const classes = useStyles({ keyColor, timeColor })

	return (
		<td>
			<div className={classes.cell}>
				<div className={classes.infos}>
					<span className={classes.score}>+{dungeonRun?.level ?? 0}</span>
					<span>({dungeonRun?.score ?? 0})</span>
				</div>

				<div>
					<div className={classes.time}>
						<span className={classes.clock}>
							<ClockIcon width={16} />
							{formatTime(dungeonRun?.time)}
						</span>

					{dungeonRun != null && (
						<span>+{dungeonRun.keyUpgrades}</span>
					)}
					</div>

					<ProgressBar
						value={dungeonRun?.time}
						max={dungeon?.maxTime}
						color={timeColor}
					/>
				</div>
			</div>
		</td>
	)
}

export default MythicOverviewTableCell

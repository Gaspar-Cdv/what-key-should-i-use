import { MythicDungeonRun } from '../../../types/MythicDungeon'
import { formatTime } from '../../../utils/stringUtils'

interface MythicOverviewTooltipProps {
	dungeon: MythicDungeonRun
	keyColor?: string
	timeColor?: string
	maxTime?: number
	className?: string
}

function MythicOverviewTooltip ({ dungeon, keyColor, timeColor, maxTime, className }: MythicOverviewTooltipProps) {
	const { name, affix, level, score, keyUpgrades, time } = dungeon

	const hasTime = time != null && maxTime != null
	const timeDifference = hasTime ? <span style={{ color: timeColor }}>{(maxTime - time > 0 ? '+' : '-') + formatTime(Math.abs(maxTime - time))}</span> : null

	return (
		<div>
			<div style={{ textAlign: 'center', fontWeight: 'bold', color: 'lightgrey' }}>{name} ({affix})</div>

			<hr />

			<table className={className}>
				<tbody>
					<tr>
						<td>Level:</td>
						<td>+{level}</td>
					</tr>
					<tr>
						<td>Mythic rating:</td>
						<td style={{ color: keyColor }}>{score}</td>
					</tr>
					<tr>
						<td>Time:</td>
						<td>
							{formatTime(time)}
							{hasTime && (
								<>&nbsp;/ {formatTime(maxTime)} ({timeDifference})</>
							)}
						</td>
					</tr>
					<tr>
						<td>Key upgrades:</td>
						<td>+{keyUpgrades}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default MythicOverviewTooltip

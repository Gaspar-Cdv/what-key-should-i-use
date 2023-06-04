import { useState } from 'react'
import { Role } from '../../../types/enums/Role'
import { createUseStyles } from 'react-jss'
import { ReactComponent as CopyIcon } from '../../../images/copy.svg'

const useStyles = createUseStyles({
	code: {
		fontSize: 16,
		background: 'black',
		color: '#eee',
		fontFamily: 'monospace',
		padding: 20,
		margin: [20, 10],
		position: 'relative'
	},
	copy: {
		position: 'absolute',
		top: 10,
		right: 10,
		display: 'flex',
		alignItems: 'center',
		gap: 5,
		padding: [5, 10],
		backgroundColor: '#333',
		cursor: 'pointer',
		transition: 'background-color 0.1s',
		'&:hover': {
			backgroundColor: '#444'
		}
	},
	options: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: [0, 10],
		'& > label': {
			display: 'flex',
			gap: 5,
			alignItems: 'center'
		}
	}
})

interface PremadeGroupFilterProps {
	role: Role
	totalScore: number
	shortNames: string[]
}

function PremadeGroupFilter ({ role, totalScore, shortNames }: PremadeGroupFilterProps) {
	const classes = useStyles()

	const [atLeastTankOrHeal, setAtLeastTankOrHeal] = useState(true)
	const [minScore, setMinScore] = useState((Math.floor(totalScore * 0.66 / 100) * 100).toString())
	const [codeHovered, setCodeHovered] = useState(false)
	const [copied, setCopied] = useState(false)

	const firstLine: Record<Role, string> = {
		'DPS': 'dps < 3',
		'TANK': 'tanks == 0',
		'HEALING': 'heals == 0'
	}

	const secondLine: Record<Role, string> = {
		'DPS': '(heals == 1 or tanks == 1)',
		'TANK': 'heals == 1',
		'HEALING': 'tanks == 1'
	}

	const code = [
		firstLine[role],
		...(atLeastTankOrHeal ? [secondLine[role]] : []),
		...(parseInt(minScore) > 0 ? [`mprating > ${minScore}`] : []),
		...(shortNames.length > 0 ? [`(${shortNames.join(' or ').toLowerCase()})`] : [])
	]

	const handleCopyCode = async () => {
		await navigator.clipboard.writeText(code.join('\nand '))
		setCopied(true)
	}

	const handleMouseEnter = () => setCodeHovered(true)
	const handleMouseLeave = () => {
		setCodeHovered(false)
		setCopied(false)
	}

	return (
		<div>
			<div>
				If you use the addon <a href='https://www.curseforge.com/wow/addons/premade-groups-filter' target='_blank'>Premade Group Filter</a>, here is a query you can copy and paste to find the keys you need.
				You can filter the search by only displaying groups that already have a tank or a healing. You can also filter by the mythic rating of the group leader. The default value is approximately two-thrids or your mythic rating. 
			</div>

			<div className={classes.code} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				{codeHovered && (
					<div className={classes.copy} onClick={handleCopyCode}>
						<CopyIcon />
						{copied ? 'Copied' : 'Copy'}
					</div>)}
				{code.map((line, i) => <div key={line}>{i > 0 && 'and '}{line}</div>)}
			</div>

			<div className={classes.options}>
				<label htmlFor='atLeastTankOrHeal'>
					<input type="checkbox" id='atLeastTankOrHeal' checked={atLeastTankOrHeal} onChange={e => setAtLeastTankOrHeal(e.target.checked)} />
					Include at least a tank or a heal
				</label>

				<label htmlFor='minScore'>
					Minimum mythic score :
					<input id='minScore' value={minScore} onChange={e => setMinScore(e.target.value)} size={3} />
				</label>
			</div>
		</div>
	)
}

export default PremadeGroupFilter

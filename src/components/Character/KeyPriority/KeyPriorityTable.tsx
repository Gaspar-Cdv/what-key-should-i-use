import { createUseStyles } from 'react-jss'
import { MythicDungeonRun } from '../../../types/MythicDungeon'
import KeyPrioritiesHeaders from './KeyPriorityHeaders'
import KeyPrioritiesRow from './KeyPriorityRow'

const useStyles = createUseStyles({
	table: {
		width: '100%',
		color: 'white',
		backgroundColor: '#000',
		borderCollapse: 'collapse',
		'& td,th': {
			border: '1px solid #333',
			padding: [15, 20]
		}
	}
})

interface KeyPrioritiesTableProps {
	dungeons: MythicDungeonRun[]
	currentDungeonsScores: number[]
}

function KeyPrioritiesTable ({ dungeons, currentDungeonsScores }: KeyPrioritiesTableProps) {
	const classes = useStyles()

	return (
		<table className={classes.table}>
			<KeyPrioritiesHeaders />
			<tbody>
				{dungeons.map((priority, index) => (
					<KeyPrioritiesRow
						key={priority.name}
						dungeon={priority}
						index={index + 1}
						currentDungeonsScores={currentDungeonsScores}
					/>
				))}
			</tbody>
		</table>
	)
}

export default KeyPrioritiesTable

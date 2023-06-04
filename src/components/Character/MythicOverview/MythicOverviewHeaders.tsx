import { createUseStyles } from 'react-jss'
import { FirstAffix } from '../../../types/enums/FirstAffix'
import { SortOrder } from '../../../hooks/useSort'
import SortIcon from '../../common/SortIcon'

const useStyles = createUseStyles({
	header: {
		display: 'flex',
		alignItems: 'center',
		gap: 20,
		fontSize: 20,
		'& img': {
			borderRadius: 5
		}
	},
	title: {
		flex: 1
	}
})

export type ColumnName = FirstAffix | 'Dungeon'

interface MythicOverviewHeaders {
	orderState: Record<ColumnName, SortOrder>
	toggleColumn: (column: ColumnName) => void
	activeColumn: ColumnName
}

function MythicOverviewHeaders ({ toggleColumn, orderState, activeColumn }: MythicOverviewHeaders) {
	const classes = useStyles()

	return (
		<thead>
			<tr>
				{(['Dungeon', 'Tyrannical', 'Fortified'] as ColumnName[])
					.map((column) => (
						<th key={column}>
							<div className={classes.header}>
								<img src={`./images/${column.toLowerCase()}.jpg`} />
								<span className={classes.title}>{column}</span>
								<SortIcon order={orderState[column]} active={activeColumn === column} onClick={() => toggleColumn(column)} />
							</div>
						</th>
					))
				}
			</tr>
		</thead>
	)
}

export default MythicOverviewHeaders

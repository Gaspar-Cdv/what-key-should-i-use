import { createUseStyles } from 'react-jss'
import { FirstAffix } from '../../../types/enums/FirstAffix'
import { byTyrannicalFirst } from './MythicOverview'

const useStyles = createUseStyles({
	header: {
		display: 'flex',
		alignItems: 'center',
		gap: 20,
		fontSize: 20,
		'& img': {
			borderRadius: 5
		}
	}
})

function MythicOverviewHeaders () {
	const classes = useStyles()

	return (
		<thead>
			<tr>
				<th>
					<div className={classes.header}>
						<img src='./images/dungeon.jpg' />
						Dungeon
					</div>
				</th>
				{Object.values(FirstAffix)
					.sort(byTyrannicalFirst)
					.map(affix => (
						<th key={affix}>
							<div className={classes.header}>
								<img src={`./images/${affix.toLowerCase()}.jpg`} />
								{affix}
							</div>
						</th>
					))
				}
			</tr>
		</thead>
	)
}

export default MythicOverviewHeaders

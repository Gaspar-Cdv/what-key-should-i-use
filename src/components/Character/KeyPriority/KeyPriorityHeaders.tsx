import { createUseStyles } from 'react-jss'
import InfoTooltip from '../../common/InfoTooltip'

const useStyles = createUseStyles({
	header: {
		display: 'flex',
		alignItems: 'center',
		gap: 10,
		fontSize: 20
	}
})

function KeyPrioritiesHeaders () {
	const classes = useStyles()

	return (
		<thead>
			<tr>
				<th>
					<div className={classes.header}>
						#
					</div>
				</th>
				<th>
					<div className={classes.header}>
						Dungeon
					</div>
				</th>
				<th>
					<div className={classes.header}>
						What key should I use ?
					</div>
				</th>
				<th>
					<div className={classes.header}>
						Score
						<InfoTooltip>
							The number between parenthesis corresponds to the score you could earn if you run this key at the same level as your highest key.
						</InfoTooltip>
					</div>
				</th>
			</tr>
		</thead>
	)
}

export default KeyPrioritiesHeaders

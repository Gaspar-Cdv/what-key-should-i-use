import { createUseStyles } from 'react-jss'

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
					</div>
				</th>
			</tr>
		</thead>
	)
}

export default KeyPrioritiesHeaders

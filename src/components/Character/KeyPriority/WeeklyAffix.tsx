import { createUseStyles } from 'react-jss'
import { FirstAffix } from '../../../types/enums/FirstAffix'

const useStyles = createUseStyles({
	affix: {
		display: 'flex',
		justifyContent: 'center',
		textAlign: 'right',
		alignItems: 'center',
		gap: 10
	},
	affixName: {
		fontSize: 22,
		fontWeight: 'bold',
	}
})

interface WeeklyAffixProps {
	weeklyAffix: FirstAffix
}

function WeeklyAffix ({ weeklyAffix }: WeeklyAffixProps) {
	const classes = useStyles()

	return (
		<div className={classes.affix}>
			<div>
				Weekly affix:<br />
				<span className={classes.affixName}>{weeklyAffix}</span>
			</div>
			<img src={`./images/${weeklyAffix.toLowerCase()}.jpg`} />
		</div>
	)
}

export default WeeklyAffix

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
	progressBarContainer: ({ ratio }: { ratio: number }) => ({
		width: '100%',
		height: 10,
		backgroundColor: '#666666',
		display: 'flex',
		justifyContent: ratio < 1 ? 'flex-end' : 'flex-start',
		borderRadius: 5,
		overflow: 'hidden'
	}),
	progressBar: ({ ratio, color }: { ratio: number, color?: string }) => ({
		height: '100%',
		width: `${(ratio < 1 ? 1 - ratio : ratio - 1) * 100}%`,
		backgroundColor: color != null ? color : ratio < 1 ? 'limegreen' : 'red'
	})
})

interface ProgressBarProps {
	value?: number
	max?: number
	color?: string
}

function ProgressBar ({ value, max, color }: ProgressBarProps) {
	const ratio = value != null && max != null ? value / max : 1
	const classes = useStyles({ ratio, color })

	return (
		<div className={classes.progressBarContainer}>
			<div className={classes.progressBar} />
		</div>
	)
}

export default ProgressBar

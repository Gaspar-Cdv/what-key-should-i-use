import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
	subtitle: {
		fontSize: 28,
		margin: 0,
		textShadow: '0 0 5px black'
	}
})

interface SubTitleProps {
	children: string
}

function SubTitle ({ children }: SubTitleProps) {
	const classes = useStyles()

	return (
		<h2 className={classes.subtitle}>
			{children}
		</h2>
	)
}

export default SubTitle

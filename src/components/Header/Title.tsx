import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
	title: {
		fontSize: 42,
		margin: 0,
		textShadow: '0 0 10px black',
		textAlign: 'center',
	}
})

function Title () {
	const classes = useStyles()

	return (
		<h1 className={classes.title}>What key should I use ?</h1>
	)
}

export default Title

import { createUseStyles } from 'react-jss'
import { ReactComponent as Github } from '../../images/github.svg'

const useStyles = createUseStyles({
	footer: {
		flex: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		backdropFilter: 'blur(2px)',
		alignSelf: 'stretch',
		padding: 20,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 10
	},
	github: {
		display: 'flex',
		alignItems: 'center',
		gap: 10
	}
})

function Footer () {
	const classes = useStyles()

	return (
		<div className={classes.footer}>
			<span>Created by Gaspar Cdv with <a href='https://raider.io/api' target='_blank'>Raider.io API</a></span>
			<span className={classes.github}>
				<Github />
				<a href='https://github.com/Gaspar-Cdv/what-key-should-i-use' target='_blank'>Code source</a>
			</span>
		</div>
	)
}

export default Footer

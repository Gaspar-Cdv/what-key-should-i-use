import { createUseStyles } from 'react-jss'
import CharacterForm, { CharacterFormProps } from './CharacterForm'
import Title from './Title'

const useStyles = createUseStyles({
	header: {
		display: 'flex',
		flexDirection: 'column',
		gap: 50
	}
})

function Header (props: CharacterFormProps) {
	const classes = useStyles()

	return (
		<div className={classes.header}>
			<Title />
			<CharacterForm {...props} />
		</div>
	)
}

export default Header

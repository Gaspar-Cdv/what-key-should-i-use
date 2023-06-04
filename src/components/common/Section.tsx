import { ReactElement } from 'react'
import { createUseStyles } from 'react-jss'
import SubTitle from './SubTitle'

const useStyles = createUseStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		backdropFilter: 'blur(2px)',
		border: '1px solid #333',
		borderRadius: 5,
		padding: 30
	}
})

interface SectionProps {
	title: string
	children: ReactElement | ReactElement[]
}

function Section ({ title, children }: SectionProps) {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<SubTitle>{title}</SubTitle>
			{children}
		</div>
	)
}

export default Section

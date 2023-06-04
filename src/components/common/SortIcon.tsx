import { createUseStyles } from 'react-jss'
import { SortOrder } from '../../hooks/useSort'

interface JSSProps {
	active: boolean
}

const useStyles = createUseStyles({
	icon: ({ active }: JSSProps) => ({
		color: active ? 'white' : 'grey',
		fontSize: 16,
		padding: 5,
		cursor: 'pointer'
	})
})

interface SortIconProps {
	order: SortOrder
	active: boolean
	onClick: () => void
}

function SortIcon ({ order, active, onClick }: SortIconProps) {
	const classes = useStyles({ active })

	return (
		<span className={classes.icon} onClick={onClick}>
			{order === 'asc' ? '▲': '▼'}
		</span>
	)
}

export default SortIcon

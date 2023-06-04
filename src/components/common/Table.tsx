import { ReactElement } from 'react'
import { createUseStyles } from 'react-jss'

interface JSSProps {
	fixedColumns: boolean
}

const useStyles = createUseStyles({
	table: ({ fixedColumns }: JSSProps) => ({
		tableLayout: fixedColumns ? 'fixed' : 'auto',
		width: '100%',
		color: 'white',
		backgroundColor: '#000',
		borderCollapse: 'collapse',
		'& td,th': {
			border: '1px solid #333',
			padding: [15, 20]
		}
	})
})

interface TableProps {
	headers: ReactElement
	fixedColumns?: boolean
	children: ReactElement[]
}

function Table ({ headers, fixedColumns = false, children }: TableProps) {
	const classes = useStyles({ fixedColumns })

	return (
		<table className={classes.table}>
			{headers}
			<tbody>
				{children}
			</tbody>
		</table>
	)
}

export default Table

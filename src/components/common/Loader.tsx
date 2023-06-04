import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
	loader: {
		opacity: 0,
		transition: 'opacity 0.5s'
	},
	visible: {
		opacity: 1
	}
})

interface LoaderProps {
	size?: number
	color?: string
}

function Loader ({ size = 60, color = '#FFFFFF' }: LoaderProps) {
	const classes = useStyles()
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		setVisible(true)
		return () => setVisible(false)
	}, [])

	return (
		<div className={classNames(classes.loader, { [classes.visible]: visible })}>
			<svg
				width={size}
				height={size}
				viewBox='0 0 40 40'
				xmlns='http://www.w3.org/2000/svg'
				stroke={color}
				>
				<g fill='none' fillRule='evenodd'>
					<g transform='translate(2 2)' strokeWidth='3'>
						<circle strokeOpacity='.3' cx='18' cy='18' r='18' />
						<path d='M36 18c0-9.94-8.06-18-18-18'>
							<animateTransform
								attributeName='transform'
								type='rotate'
								from='0 18 18'
								to='360 18 18'
								dur='1s'
								repeatCount='indefinite'
								/>
						</path>
					</g>
				</g>
			</svg>
		</div>
	)
}

export default Loader

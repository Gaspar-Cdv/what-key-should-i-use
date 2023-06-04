import Tooltip from './Tooltip'
import { ReactComponent as InfoIcon } from '../../images/info.svg'
import { ReactComponent as QuestionIcon } from '../../images/question.svg'
import { ReactComponent as WarningIcon } from '../../images/warning.svg'
import { FunctionComponent, ReactElement } from 'react'

type TooltipType = 'info' | 'question' | 'warning'

interface InfoTooltipProps {
	type?: TooltipType
	children: ReactElement | string
}

const iconsList: Record<TooltipType, FunctionComponent<React.SVGProps<SVGSVGElement>>> = {
	info: InfoIcon,
	question: QuestionIcon,
	warning: WarningIcon
}

function InfoTooltip ({ type = 'info', children }: InfoTooltipProps) {
	const Icon = iconsList[type]

	return (
		<Tooltip content={children}>
			<Icon color='#ff6600' width={20} />
		</Tooltip>
	)
}

export default InfoTooltip

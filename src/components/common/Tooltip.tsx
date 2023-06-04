import { ReactElement, ReactNode } from 'react'
import ReactDOMServer from 'react-dom/server'

export const TOOLTIP_ID = 'react-tooltip'

interface TooltipProps {
	content: ReactElement | string
	wrapper?: keyof JSX.IntrinsicElements
	children: ReactNode
}

function Tooltip ({ content, wrapper = 'div', children }: TooltipProps) {
	const Wrapper = wrapper as keyof JSX.IntrinsicElements
	const isContentString = typeof content === 'string'

	return (
		<Wrapper data-tooltip-id={TOOLTIP_ID}
			data-tooltip-content={isContentString ? content : undefined}
			data-tooltip-html={!isContentString ? ReactDOMServer.renderToStaticMarkup(content) : undefined}
		>
			{children}
		</Wrapper>
	)
}

export default Tooltip

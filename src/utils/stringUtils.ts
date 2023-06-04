export const formatTime = (milliseconds?: number) => {
	const minutes = milliseconds ? Math.floor(milliseconds / 60000) : '--'
	const secondes = milliseconds ? Math.floor((milliseconds % 60000) / 1000).toString().padStart(2, '0') : '--'

	return `${minutes}'${secondes}`
}

export const COLOR_PANEL = ['red', 'orange', 'yellow', 'limegreen']

export const getColor = (values: number[], value?: number, panel = COLOR_PANEL) => {
	if (value == null) {
		return undefined
	}

	const min = Math.min(...values)
	const max = Math.max(...values)

	if (min === max) {
		return panel[panel.length - 1]
	}

	const index = Math.round((value - min) / (max - min) * (panel.length - 1))

	return panel[index]
}

import { useMemo, useState } from 'react'

export type SortCallback<T> = (a: T, b: T) => number
export type SortOrder = 'asc' | 'desc'

/**
 * Hook that manages sorting functionality for a table or list.
 * @template C - The type of the column keys.
 * @template S - The type of the items being sorted.
 * @param {C} initialColumn - The initial column to sort by.
 * @param {Record<C, SortCallback<S>>} callbacks - Object containing sort callbacks for each column.
 * @returns {[SortCallback<S>, (column: C) => void, Record<C, SortOrder>, C]} - An array containing the sort callback,
 * toggleColumn function, order state, and active column.
 */
export function useSort<C extends string, S> (
	initialColumn: C,
	callbacks: Record<C, SortCallback<S>>
) {
	const defaultOrderState = Object.fromEntries(
		Object.keys(callbacks).map((column) => [column, 'asc'])
	) as Record<C, SortOrder>

	const [orderState, setOrderState] = useState(defaultOrderState)
	const [activeColumn, setActiveColumn] = useState<C>(initialColumn)

	const toggleColumn = (column: C) => {
		setActiveColumn(column)
		setOrderState(orders => ({
			...orders,
			[column]: orders[column] === 'asc' ? 'desc' : 'asc'
		}))
	}

	const sortCallback = useMemo(() => {
		return orderState[activeColumn] === 'asc'
			? callbacks[activeColumn]
			: (a: S, b: S) => -callbacks[activeColumn](a, b)
	}, [orderState, activeColumn])

	return [sortCallback, toggleColumn, orderState, activeColumn] as const
}

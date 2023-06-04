import { useEffect, useState } from 'react'

export const useLocalStorage = <T> (key: string, defaultValue: T): [T, (value: T) => void] => {
	const initialValue: T = JSON.parse(localStorage.getItem(key)!) || defaultValue
	const [value, setValue] = useState<T>(initialValue)

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue]
}

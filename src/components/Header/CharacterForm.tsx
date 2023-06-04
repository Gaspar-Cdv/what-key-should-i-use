import { createUseStyles } from 'react-jss'
import { Region } from '../../types/enums/Region'
import { FormEvent } from 'react'

const useStyles = createUseStyles({
	container: {
		display: 'flex',
		justifyContent: 'center',
		gap: 10
	}
})

export interface CharacterFormProps {
	region: Region
	realm: string
	characterName: string
	onRegionChange: (region: Region) => void
	onRealmChange: (realm: string) => void
	onCharacterNameChange: (characterName: string) => void
	onSubmit: () => Promise<void>
	pending: boolean
}

function CharacterForm ({ region, realm, characterName, onRegionChange, onRealmChange, onCharacterNameChange, onSubmit, pending }: CharacterFormProps) {
	const classes = useStyles()

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		await onSubmit()
	}

	return (
		<form className={classes.container} onSubmit={handleSubmit}>
			<select
				value={region}
				onChange={e => onRegionChange(e.target.value as Region)}
			>
				{Object.values(Region).map(region => (
					<option key={region} value={region}>{region}</option>
				))}
			</select>

			<input
				placeholder='Realm'
				value={realm}
				onChange={e => onRealmChange(e.target.value)}
			/>

			<input
				placeholder='Character name'
				value={characterName}
				onChange={e => onCharacterNameChange(e.target.value)}
			/>

			<button disabled={pending}>Submit</button>
		</form>
	)
}

export default CharacterForm

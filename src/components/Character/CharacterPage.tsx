import { createUseStyles } from 'react-jss'
import { CharacterInfos } from '../../types/CharacterInfos'
import { Dungeon } from '../../types/MythicDungeon'
import { FirstAffix } from '../../types/enums/FirstAffix'
import Loader from '../common/Loader'
import KeyPriorities from './KeyPriority/KeyPriorities'
import MythicOverview from './MythicOverview/MythicOverview'
import Profile from './Profile/Profile'
import { RaiderApiScoreTiers } from '../../types/RaiderApi/RaiderApiScoreTiers'
import Section from '../common/Section'

const useStyles = createUseStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 50
	},
	center: {
		textShadow: '0 0 5px black',
		minHeight: 70,
		margin: [0, 'auto']
	}
})

interface CharacterPageProps {
	characterInfos?: CharacterInfos
	weeklyAffix?: FirstAffix
	currentSeasonDungeons: Dungeon[]
	scoreTiers: RaiderApiScoreTiers[]
	pending: boolean
	error?: string
}

function CharacterPage ({ characterInfos, weeklyAffix, currentSeasonDungeons, scoreTiers, pending, error }: CharacterPageProps) {
	const classes = useStyles()

	if (pending) {
		return (
			<div className={classes.center}>
				<Loader />
			</div>
		)
	}

	if (error != null || characterInfos == null || weeklyAffix == null || currentSeasonDungeons.length === 0) {
		return (
			<div className={classes.center}>
				{error}
			</div>
		)
	}

	return (
		<div className={classes.container}>
			<Section title='Profile'>
				<Profile characterInfos={characterInfos} scoreTiers={scoreTiers} />
			</Section>

			<Section title='Mythic overview'>
				<MythicOverview characterInfos={characterInfos} />
			</Section>

				<KeyPriorities
					characterInfos={characterInfos}
					weeklyAffix={weeklyAffix}
				/>
		</div>
	)
}

export default CharacterPage

import { useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { useFetchCharacterInfos, useFetchStaticData } from '../hooks/useFetchRaiderIo'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Region } from '../types/enums/Region'
import CharacterPage from './Character/CharacterPage'
import Header from './Header/Header'
import Footer from './Footer/Footer'

const useStyles = createUseStyles({
	app: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100vh'
	},
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 50,
		width: 900,
		maxWidth: 'calc(100% - 60px)',
		margin: 30,
	}
})

function App () {
	const classes = useStyles()

	const [region, setRegion] = useLocalStorage('region', Region.US)
	const [realm, setRealm] = useLocalStorage('realm', '')
	const [name, setName] = useLocalStorage('characterName', '')

	const [{ mythicDungeons, weeklyAffix, scoreTiers }, fetchStaticData, staticDataError, staticDataPending] = useFetchStaticData(region)
	const [characterInfos, fetchCharacterInfos, characterInfosError, characterInfosPending] = useFetchCharacterInfos({ region, realm, name }, mythicDungeons)

	const pending = staticDataPending || characterInfosPending

	useEffect(() => {
		fetchStaticData()
	}, [region])

	return (
		<div className={classes.app}>
			<div className={classes.container}>
				<Header
					region={region}
					realm={realm}
					characterName={name}
					onRegionChange={setRegion}
					onRealmChange={setRealm}
					onCharacterNameChange={setName}
					onSubmit={fetchCharacterInfos}
					pending={pending}
				/>

				<CharacterPage
					characterInfos={characterInfos}
					weeklyAffix={weeklyAffix}
					currentSeasonDungeons={mythicDungeons}
					scoreTiers={scoreTiers}
					pending={pending}
					error={staticDataError ?? characterInfosError}
				/>
			</div>

			<Footer />
		</div>
	)
}

export default App

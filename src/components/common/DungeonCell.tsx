import { createUseStyles } from 'react-jss'
import { Dungeon } from '../../types/MythicDungeon'

interface JSSProps {
	shortName: string
}

const useStyles = createUseStyles({
	dungeonName: ({ shortName }: JSSProps) => ({
		fontSize: 18,
		fontWeight: 'bold',
		backgroundImage: `url('./images/dungeons/${shortName.toLowerCase()}.jpg')`,
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		textShadow: '0 0 10px black'
	})
})

interface DungeonCellProps {
	dungeon: Dungeon
}

function DungeonCell ({ dungeon }: DungeonCellProps) {
	const classes = useStyles({ shortName: dungeon.shortName })

	return (
		<td className={classes.dungeonName}>
			{dungeon.name}
		</td>
	)
}

export default DungeonCell

import { CharacterInfos } from '../../../types/CharacterInfos'
import { createUseStyles } from 'react-jss'
import { Gender } from '../../../types/enums/Gender'
import { RaiderApiScoreTiers } from '../../../types/RaiderApi/RaiderApiScoreTiers'
import { Role } from '../../../types/enums/Role'

interface JSSProps {
	gender: Gender
	mythicRatingColor?: string
	role: Role
}

const useStyles = createUseStyles({
	container: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	imgContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 5,
		'& > img': {
			height: 84,
			width: 84
		}
	},
	name: ({ gender }: JSSProps) => ({
		fontSize: 24,
		fontWeight: 'bold',
		'&::after': {
			content: `" ${gender === 'male' ? '♂' : '♀'}"`,
			color: gender === 'male' ? '#007BFF' : '#FF69B4'
		}
	}),
	mythicRating: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 10
	},
	totalScore: ({ mythicRatingColor }: JSSProps) => ({
		color: mythicRatingColor,
		fontSize: 32,
		fontWeight: 'bold',
		textShadow: '0 0 5px black'
	}),
	class: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'& > div:first-child': {
			fontSize: 20,
			fontWeight: 'bold'
		}
	},
	role: ({ role }: JSSProps) => ({
		display: 'flex',
		alignItems: 'center',
		gap: 5,
		'&::after': {
			content: '""',
			backgroundImage: `url('./images/roles/${role}.png')`,
			backgroundSize: 30,
			height: 30,
			width: 30,
			display: 'inline-block'
		}
	})
})

interface ProfileProps {
	characterInfos: CharacterInfos
	scoreTiers: RaiderApiScoreTiers[]
}

function Profile ({ characterInfos, scoreTiers }: ProfileProps) {
	const mythicRatingColor = scoreTiers.find(x => x.score < characterInfos.totalScore)?.rgbHex
	const classes = useStyles({
		gender: characterInfos.gender,
		mythicRatingColor,
		role: characterInfos.role
	})

	const classImg = characterInfos.spec != null
		? `./images/specs/${characterInfos.class} ${characterInfos.spec}.png`
		: `./images/classes/${characterInfos.class}.webp`

	return (
		<div className={classes.container}>
			<div className={classes.imgContainer}>
				<span className={classes.name}>{characterInfos.name}</span>
				<img src={characterInfos.avatar} />
				<span>{characterInfos.race}</span>
			</div>

			<div className={classes.mythicRating}>
				<span>Mythic rating:</span>
				<span className={classes.totalScore}>{characterInfos.totalScore}</span>
			</div>

			<div className={classes.imgContainer}>
				<div className={classes.class}>
					<div>{characterInfos.class}</div>
					<div>{characterInfos.spec}</div>
				</div>
				<img src={classImg.toLowerCase()} />
				<span className={classes.role}>{characterInfos.role}</span>
			</div>
		</div>
	)
}

export default Profile

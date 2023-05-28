import { Region } from './enums/Region'

export interface CharacterRequest {
	region: Region
	realm: string
	name: string
}

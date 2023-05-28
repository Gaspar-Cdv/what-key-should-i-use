type Spec = 'all' | 'dps' | 'healer' | 'tank' | 'spec_0' | 'spec_1' | 'spec_2' | 'spec_3'

export interface RaiderApiScores {
	season: string
	scores: {
		[key in Spec]: number
	}
	segments: {
		[key in Spec]: {
			score: number
			color: string
		}
	}
}
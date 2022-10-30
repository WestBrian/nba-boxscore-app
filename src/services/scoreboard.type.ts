export type ScoreboardResponse = {
  meta: {
    version: number
    request: string
    time: string
    code: number
  }
  scoreboard: {
    gameDate: string
    leagueId: string
    leagueName: string
    games: Array<{
      gameId: string
      gameCode: string
      gameStatus: number
      gameStatusText: string
      period: number
      gameClock: string
      gameTimeUTC: string
      gameEt: string
      regulationPeriods: number
      ifNecessary: boolean
      seriesGameNumber: string
      seriesText: string
      homeTeam: {
        teamId: number
        teamName: string
        teamCity: string
        teamTricode: string
        wins: number
        losses: number
        score: number
        seed: any
        inBonus?: string
        timeoutsRemaining: number
        periods: Array<{
          period: number
          periodType: string
          score: number
        }>
      }
      awayTeam: {
        teamId: number
        teamName: string
        teamCity: string
        teamTricode: string
        wins: number
        losses: number
        score: number
        seed: any
        inBonus?: string
        timeoutsRemaining: number
        periods: Array<{
          period: number
          periodType: string
          score: number
        }>
      }
      gameLeaders: {
        homeLeaders: {
          personId: number
          name: string
          jerseyNum: string
          position: string
          teamTricode: string
          playerSlug?: string
          points: number
          rebounds: number
          assists: number
        }
        awayLeaders: {
          personId: number
          name: string
          jerseyNum: string
          position: string
          teamTricode: string
          playerSlug?: string
          points: number
          rebounds: number
          assists: number
        }
      }
      pbOdds: {
        team: any
        odds: number
        suspended: number
      }
    }>
  }
}

export type LiveGame = ScoreboardResponse['scoreboard']['games'][number]

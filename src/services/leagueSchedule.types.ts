export type LeagueScheduleResponse = {
  meta: {
    version: number
    request: string
    time: string
  }
  leagueSchedule: {
    seasonYear: string
    leagueId: string
    gameDates: Array<{
      gameDate: string
      games: Array<{
        gameId: string
        gameCode: string
        gameStatus: number
        gameStatusText: string
        gameSequence: number
        gameDateEst: string
        gameTimeEst: string
        gameDateTimeEst: string
        gameDateUTC: string
        gameTimeUTC: string
        gameDateTimeUTC: string
        awayTeamTime: string
        homeTeamTime: string
        day: string
        monthNum: number
        weekNumber: number
        weekName: string
        ifNecessary: boolean
        seriesGameNumber: string
        seriesText: string
        arenaName: string
        arenaState: string
        arenaCity: string
        postponedStatus: string
        branchLink: string
        broadcasters: {
          nationalTvBroadcasters: Array<{
            broadcasterScope: string
            broadcasterMedia: string
            broadcasterId: number
            broadcasterDisplay: string
            broadcasterAbbreviation: string
            tapeDelayComments: string
            regionId: number
          }>
          nationalRadioBroadcasters: Array<{
            broadcasterScope: string
            broadcasterMedia: string
            broadcasterId: number
            broadcasterDisplay: string
            broadcasterAbbreviation: string
            tapeDelayComments: string
            regionId: number
          }>
          homeTvBroadcasters: Array<{
            broadcasterScope: string
            broadcasterMedia: string
            broadcasterId: number
            broadcasterDisplay: string
            broadcasterAbbreviation: string
            tapeDelayComments: string
            regionId: number
          }>
          homeRadioBroadcasters: Array<{
            broadcasterScope: string
            broadcasterMedia: string
            broadcasterId: number
            broadcasterDisplay: string
            broadcasterAbbreviation: string
            tapeDelayComments: string
            regionId: number
          }>
          awayTvBroadcasters: Array<{
            broadcasterScope: string
            broadcasterMedia: string
            broadcasterId: number
            broadcasterDisplay: string
            broadcasterAbbreviation: string
            tapeDelayComments: string
            regionId: number
          }>
          awayRadioBroadcasters: Array<{
            broadcasterScope: string
            broadcasterMedia: string
            broadcasterId: number
            broadcasterDisplay: string
            broadcasterAbbreviation: string
            tapeDelayComments: string
            regionId: number
          }>
          intlRadioBroadcasters: Array<any>
          intlTvBroadcasters: Array<any>
        }
        homeTeam: {
          teamId: number
          teamName: string
          teamCity: string
          teamTricode: string
          teamSlug: string
          wins: number
          losses: number
          score: number
          seed: number
        }
        awayTeam: {
          teamId: number
          teamName: string
          teamCity: string
          teamTricode: string
          teamSlug: string
          wins: number
          losses: number
          score: number
          seed: number
        }
        pointsLeaders: Array<{
          personId: number
          firstName: string
          lastName: string
          teamId: number
          teamCity: string
          teamName: string
          teamTricode: string
          points: number
        }>
      }>
    }>
    weeks: Array<{
      weekNumber: number
      weekName: string
      startDate: string
      endDate: string
    }>
    broadcasterList: Array<{
      broadcasterId: number
      broadcasterDisplay: string
      broadcasterAbbreviation: string
      regionId: number
    }>
  }
}

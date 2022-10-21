import type { IBoxscore, IScoreboard } from '../types'
import { customFetch } from '../utils/fetch'
import { format } from 'date-fns'
import type { LeagueScheduleResponse } from './leagueSchedule.types'

class NBAService {
  private host = 'https://data.nba.net/prod/v1'
  private cdnHost = 'https://cdn.nba.com/static/json'

  private todaysScoreboardUrl = `${this.cdnHost}/liveData/scoreboard/todaysScoreboard_00.json`
  private leagueScheduleUrl = `${this.cdnHost}/staticData/scheduleLeagueV2_1.json`

  private leagueSchedule: LeagueScheduleResponse | null = null

  private getUrl(path: string) {
    return `${this.host}${path}`
  }

  private formatDate(date: Date) {
    return format(date, 'yyyyMMdd')
  }

  getLogoSrc(teamId: string) {
    return `https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`
  }

  getScoreboardPath(date: Date) {
    return this.getUrl(`/${this.formatDate(date)}/scoreboard.json`)
  }

  async getScoreboard(date: Date) {
    if (!this.leagueSchedule) {
      await this.getLeagueSchedule()
    }
    return this.leagueSchedule?.leagueSchedule.gameDates.find((gameDate) =>
      gameDate.gameDate.includes(format(date, 'MM/dd/yyyy'))
    )
  }

  getBoxscorePath(date: Date, gameId: string) {
    return this.getUrl(`/${this.formatDate(date)}/${gameId}_boxscore.json`)
  }

  async getBoxscore(date: Date, gameId: string) {
    return await customFetch<IBoxscore>(this.getBoxscorePath(date, gameId))
  }

  async getLeagueSchedule() {
    this.leagueSchedule = await customFetch<LeagueScheduleResponse>(
      this.leagueScheduleUrl
    )
    return this.leagueSchedule
  }
}

export const nbaService = new NBAService()

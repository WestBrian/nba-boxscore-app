import type { IBoxscore, IScoreboard } from '../types'
import { customFetch } from '../utils/fetch'
import { format } from 'date-fns'

class NBAService {
  private host = 'https://data.nba.net/prod/v1'

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
    return `/${this.formatDate(date)}/scoreboard.json`
  }

  async getScoreboard(date: Date) {
    return await customFetch<IScoreboard>(
      this.getUrl(this.getScoreboardPath(date))
    )
  }

  getBoxscorePath(date: Date, gameId: string) {
    return `/${this.formatDate(date)}/${gameId}_boxscore.json`
  }

  async getBoxscore(date: Date, gameId: string) {
    return await customFetch<IBoxscore>(
      this.getUrl(this.getBoxscorePath(date, gameId))
    )
  }
}

export const nbaService = new NBAService()

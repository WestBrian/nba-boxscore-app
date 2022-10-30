import { customFetch } from '../utils/fetch'
import type { BoxscoreResponse } from './boxscore.type'
import type { LeagueScheduleResponse } from './schedule.type'
import type { ScoreboardResponse } from './scoreboard.type'

const host = 'https://cdn.nba.com'
const scheduleUrl = `${host}/static/json/staticData/scheduleLeagueV2_1.json`
const scoreboardUrl = `${host}/static/json/liveData/scoreboard/todaysScoreboard_00.json`
const boxscoreUrl = (gameId: string) =>
  `${host}/static/json/liveData/boxscore/boxscore_${gameId}.json`

export const getLeagueSchedule = async () => {
  return customFetch<LeagueScheduleResponse>(scheduleUrl)
}

export const getScoreboard = async () => {
  return customFetch<ScoreboardResponse>(scoreboardUrl)
}

export const getBoxscore = async (gameId: string) => {
  return customFetch<BoxscoreResponse>(boxscoreUrl(gameId))
}

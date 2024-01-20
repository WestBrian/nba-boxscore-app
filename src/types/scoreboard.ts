export interface Scoreboard {
  leagues: LeaguesItem[]
  events: EventsItem[]
}
export interface LeaguesItem {
  id: string
  uid: string
  name: string
  abbreviation: string
  slug: string
  season: Season
  logos: LogosItem[]
  calendarType: string
  calendarIsWhitelist: boolean
  calendarStartDate: string
  calendarEndDate: string
  calendar: string[]
}
export interface Season {
  year: number
  startDate?: string
  endDate?: string
  displayName?: string
  type: Type | number
  slug?: string
}
export interface Type {
  id: string
  type?: number
  name?: string
  abbreviation?: string
  state?: string
  completed?: boolean
  description?: string
  detail?: string
  shortDetail?: string
  shortName?: string
}
export interface LogosItem {
  href: string
  width: number
  height: number
  alt: string
  rel: string[]
  lastUpdated: string
}
export interface EventsItem {
  id: string
  uid: string
  date: string
  name: string
  shortName: string
  season: Season
  competitions: CompetitionsItem[]
  links: LinksItem[]
  status: Status
}
export interface CompetitionsItem {
  id: string
  uid: string
  date: string
  attendance: number
  type: Type
  timeValid: boolean
  neutralSite: boolean
  conferenceCompetition: boolean
  playByPlayAvailable: boolean
  recent: boolean
  venue: Venue
  competitors: CompetitorsItem[]
  notes: any[]
  status: Status
  broadcasts: BroadcastsItem[]
  format: Format
  tickets: TicketsItem[]
  startDate: string
  geoBroadcasts: GeoBroadcastsItem[]
  odds: OddsItem[]
}
export interface Venue {
  id: string
  fullName?: string
  address?: Address
  capacity?: number
  indoor?: boolean
}
export interface Address {
  city: string
  state: string
}
export interface CompetitorsItem {
  id: string
  uid: string
  type: string
  order: number
  homeAway: string
  team: Team
  score: string
  statistics: StatisticsItem[]
  records: RecordsItem[]
  leaders: LeadersItem[]
}
export interface Team {
  id: string
  uid?: string
  location?: string
  name?: string
  abbreviation?: string
  displayName?: string
  shortDisplayName?: string
  color?: string
  alternateColor?: string
  isActive?: boolean
  venue?: Venue
  links?: LinksItem[]
  logo?: string
}
export interface LinksItem {
  rel?: string[]
  href: string
  text?: string
  isExternal?: boolean
  isPremium?: boolean
  language?: string
  shortText?: string
}
export interface StatisticsItem {
  name: string
  abbreviation: string
  displayValue: string
  rankDisplayValue?: string
}
export interface RecordsItem {
  name: string
  abbreviation?: string
  type: string
  summary: string
}
export interface LeadersItem {
  name?: string
  displayName?: string
  shortDisplayName?: string
  abbreviation?: string
  leaders?: LeadersItem[]
  displayValue?: string
  value?: number
  athlete?: Athlete
  team?: Team
}
export interface Athlete {
  id: string
  fullName: string
  displayName: string
  shortName: string
  links: LinksItem[]
  headshot: string
  jersey: string
  position: Position
  team: Team
  active: boolean
}
export interface Position {
  abbreviation: string
}
export interface Status {
  clock: number
  displayClock: string
  period: number
  type: Type
}
export interface Format {
  regulation: Regulation
}
export interface Regulation {
  periods: number
}
export interface TicketsItem {
  summary: string
  numberAvailable: number
  links: LinksItem[]
}
export interface OddsItem {
  provider: Provider
  details: string
  overUnder?: number
  spread: number
  open?: Open
  current?: Current
}
export interface Provider {
  id: string
  name: string
  priority: number
}
export interface Open {
  over: Over
  under: Under
  total: Total
}
export interface Over {
  value: number
  displayValue: string
  alternateDisplayValue: string
}
export interface Under {
  value: number
  displayValue: string
  alternateDisplayValue: string
}
export interface Total {
  alternateDisplayValue: string
}
export interface Current {
  over: Over
  under: Under
  total: Total
}
export interface BroadcastsItem {
  market: string
  names: string[]
}
export interface GeoBroadcastsItem {
  type: Type
  market: Market
  media: Media
  lang: string
  region: string
}
export interface Market {
  id: string
  type: string
}
export interface Media {
  shortName: string
}

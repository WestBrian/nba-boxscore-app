export interface Scoreboard {
  leagues: LeaguesItem[]
  events: EventsItem[]
}
interface LeaguesItem {
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
interface Season {
  year: number
  startDate?: string
  endDate?: string
  displayName?: string
  type: Type | number
  slug?: string
}
interface Type {
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
interface LogosItem {
  href: string
  width: number
  height: number
  alt: string
  rel: string[]
  lastUpdated: string
}
interface EventsItem {
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
interface CompetitionsItem {
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
interface Venue {
  id: string
  fullName?: string
  address?: Address
  capacity?: number
  indoor?: boolean
}
interface Address {
  city: string
  state: string
}
interface CompetitorsItem {
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
interface Team {
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
interface LinksItem {
  rel?: string[]
  href: string
  text?: string
  isExternal?: boolean
  isPremium?: boolean
  language?: string
  shortText?: string
}
interface StatisticsItem {
  name: string
  abbreviation: string
  displayValue: string
  rankDisplayValue?: string
}
interface RecordsItem {
  name: string
  abbreviation?: string
  type: string
  summary: string
}
interface LeadersItem {
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
interface Athlete {
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
interface Position {
  abbreviation: string
}
interface Status {
  clock: number
  displayClock: string
  period: number
  type: Type
}
interface Format {
  regulation: Regulation
}
interface Regulation {
  periods: number
}
interface TicketsItem {
  summary: string
  numberAvailable: number
  links: LinksItem[]
}
interface OddsItem {
  provider: Provider
  details: string
  overUnder?: number
  spread: number
  open?: Open
  current?: Current
}
interface Provider {
  id: string
  name: string
  priority: number
}
interface Open {
  over: Over
  under: Under
  total: Total
}
interface Over {
  value: number
  displayValue: string
  alternateDisplayValue: string
}
interface Under {
  value: number
  displayValue: string
  alternateDisplayValue: string
}
interface Total {
  alternateDisplayValue: string
}
interface Current {
  over: Over
  under: Under
  total: Total
}
interface BroadcastsItem {
  market: string
  names: string[]
}
interface GeoBroadcastsItem {
  type: Type
  market: Market
  media: Media
  lang: string
  region: string
}
interface Market {
  id: string
  type: string
}
interface Media {
  shortName: string
}

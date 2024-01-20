export interface Summary {
  boxscore: Boxscore
  format: Format
  gameInfo: GameInfo
  leaders: LeadersItem[]
  seasonseries: SeasonseriesItem[]
  injuries: InjuriesItem[]
  broadcasts: any[]
  predictor: Predictor
  pickcenter: any[]
  againstTheSpread: AgainstTheSpreadItem[]
  odds: any[]
  news: News
  winprobability: WinprobabilityItem[]
  header: Header
  videos: VideosItem[]
  plays: PlaysItem[]
  standings: Standings
}
interface Boxscore {
  teams: TeamsItem[]
  players: PlayersItem[]
}
interface TeamsItem {
  team: Team
  statistics: any[]
  displayOrder: number
}
interface Team {
  id?: string | number
  uid?: string
  slug?: string
  location?: string
  name?: string
  abbreviation?: string
  displayName?: string
  shortDisplayName?: string
  color?: string
  alternateColor?: string
  logo?: string
  links?: LinksItem[] | Links
  logos?: LogosItem[]
  $ref?: string
  description?: string
}
interface PlayersItem {
  team: Team
  statistics: StatisticsItem[]
  displayOrder: number
}
interface StatisticsItem {
  names?: string[]
  keys?: string[]
  labels?: string[]
  descriptions?: string[]
  athletes?: AthletesItem[]
  totals?: string[]
  name?: string
  displayName?: string
  shortDisplayName?: string
  description?: string
  abbreviation?: string
  value?: number
  displayValue?: string
}
interface AthletesItem {
  active: boolean
  athlete: Athlete
  starter: boolean
  didNotPlay: boolean
  reason: string
  ejected: boolean
  stats: string[]
}
interface Athlete {
  id: string | number
  uid?: string
  guid?: string
  displayName?: string
  shortName?: string
  links?: LinksItem[] | Links
  headshot?: Headshot
  jersey?: string
  position?: Position
  lastName?: string
  fullName?: string
  team?: Team
  collegeAthlete?: CollegeAthlete
  description?: string
}
interface LinksItem {
  rel?: string[]
  href: string
  text: string
  language?: string
  shortText?: string
  isExternal?: boolean
  isPremium?: boolean
}
interface Headshot {
  href: string
  alt: string
}
interface Position {
  name?: string
  displayName?: string
  abbreviation: string
}
interface Format {
  regulation: Regulation
  overtime: Overtime
}
interface Regulation {
  periods: number
  displayName: string
  slug: string
  clock: number
}
interface Overtime {
  clock: number
}
interface GameInfo {
  venue: Venue
}
interface Venue {
  id: string
  fullName: string
  address: Address
  capacity: number
  grass: boolean
  images: ImagesItem[]
}
interface Address {
  city: string
  state: string
}
interface ImagesItem {
  href?: string
  width: number
  height: number
  alt: string
  rel?: string[]
  name?: string
  caption?: string
  url?: string
}
interface LeadersItem {
  team?: Team
  leaders?: LeadersItem[]
  name?: string
  displayName?: string
  displayValue?: string
  athlete?: Athlete
  statistics?: StatisticsItem[]
}
interface LogosItem {
  href: string
  width: number
  height: number
  alt: string
  rel: string[]
  lastUpdated: string
}
interface SeasonseriesItem {
  type: string
  title: string
  description: string
  summary: string
  completed: boolean
  totalCompetitions: number
  events: EventsItem[]
}
interface EventsItem {
  id: string
  uid?: string
  date?: string
  timeValid?: boolean
  status?: string
  statusType?: StatusType
  broadcasts?: any[]
  competitors?: CompetitorsItem[]
  links?: LinksItem[]
  $ref?: string
}
interface StatusType {
  id: string
  name: string
  state: string
  completed: boolean
  description: string
  detail: string
  shortDetail: string
}
interface CompetitorsItem {
  homeAway?: string
  team: Team
  score?: string
  id?: string
  uid?: string
  order?: number
  linescores?: LinescoresItem[]
  record?: RecordItem[]
  timeoutsUsed?: number
  timeoutsRemaining?: number
  fouls?: Fouls
  possession?: boolean
  wins?: number
  ties?: number
}
interface InjuriesItem {
  team?: Team
  injuries?: InjuriesItem[]
  status?: string
  date?: string
  athlete?: Athlete
  type?: Type
  details?: Details
}
interface CollegeAthlete {
  $ref: string
}
interface Type {
  id: string
  name?: string
  description?: string
  abbreviation?: string
  state?: string
  completed?: boolean
  detail?: string
  shortDetail?: string
  text?: string
}
interface Details {
  fantasyStatus: FantasyStatus
  type: string
  location: string
  detail: string
  side: string
  returnDate: string
}
interface FantasyStatus {
  description: string
  abbreviation: string
}
interface Predictor {
  header: string
  homeTeam: HomeTeam
  awayTeam: AwayTeam
}
interface HomeTeam {
  id: string
}
interface AwayTeam {
  id: string
  gameProjection: string
  teamChanceLoss: string
}
interface AgainstTheSpreadItem {
  team: Team
  records: any[]
}
interface News {
  header?: string
  link?: Link
  articles?: ArticlesItem[]
  href?: string
}
interface Link {
  language: string
  rel: string[]
  href: string
  text: string
  shortText: string
  isExternal: boolean
  isPremium: boolean
}
interface ArticlesItem {
  images: ImagesItem[]
  dataSourceIdentifier: string
  description: string
  published: string
  type: string
  premium: boolean
  links: Links
  lastModified: string
  categories: CategoriesItem[]
  headline: string
}
interface Links {
  api: Api
  web: Web
  mobile?: Mobile
  source?: Source
}
interface Api {
  news?: News
  self?: Self
  teams?: Teams
  leagues?: Leagues
  athletes?: Athletes
  artwork?: Artwork
}
interface Self {
  href: string
}
interface Web {
  href?: string
  teams?: Teams
  leagues?: Leagues
  athletes?: Athletes
  short?: {
    href: string
  }
  self?: Self
}
interface CategoriesItem {
  id?: number
  description?: string
  type: string
  sportId?: number
  teamId?: number
  team?: Team
  uid?: string
  createDate: string
  leagueId?: number
  league?: League
  athleteId?: number
  athlete?: Athlete
  topicId?: number
  guid?: string
}
interface Teams {
  href: string
}
interface Mobile {
  teams?: Teams
  leagues?: Leagues
  athletes?: Athletes
  alert?: Alert
  source?: Source
  href?: string
  streaming?: Streaming
  progressiveDownload?: ProgressiveDownload
}
interface League {
  id: number | string
  description: string
  links: Links | LinksItem[]
  uid?: string
  name?: string
  abbreviation?: string
  slug?: string
  isTournament?: boolean
}
interface Leagues {
  href?: string
}
interface Athletes {
  href: string
}
interface WinprobabilityItem {
  tiePercentage: number
  homeWinPercentage: number
  playId: string
}
interface Header {
  id: string
  uid: string
  season: Season
  timeValid: boolean
  competitions: CompetitionsItem[]
  links: LinksItem[]
  league: League
}
interface Season {
  year: number
  type: number
}
interface CompetitionsItem {
  id: string
  uid: string
  date: string
  neutralSite: boolean
  conferenceCompetition: boolean
  boxscoreAvailable: boolean
  commentaryAvailable: boolean
  liveAvailable: boolean
  shotChartAvailable: boolean
  timeoutsAvailable: boolean
  possessionArrowAvailable: boolean
  onWatchESPN: boolean
  recent: boolean
  boxscoreSource: string
  playByPlaySource: string
  competitors: CompetitorsItem[]
  status: Status
  broadcasts: any[]
  series: SeriesItem[]
}
interface LinescoresItem {
  displayValue: string
}
interface RecordItem {
  type: string
  summary: string
  displayValue: string
}
interface Fouls {
  teamFouls: number
  teamFoulsCurrent: number
  foulsToGive: number
  bonusState: string
}
interface Status {
  displayClock: string
  period: number
  type: Type
}
interface SeriesItem {
  type: string
  title: string
  description: string
  summary: string
  completed: boolean
  totalCompetitions: number
  competitors: CompetitorsItem[]
  events: EventsItem[]
}
interface VideosItem {
  source: string
  id: number
  headline: string
  description: string
  ad: Ad
  tracking: Tracking
  cerebroId: string
  lastModified: string
  originalPublishDate: string
  timeRestrictions: TimeRestrictions
  deviceRestrictions: DeviceRestrictions
  geoRestrictions: GeoRestrictions
  duration: number
  thumbnail: string
  links: Links
}
interface Ad {
  sport: string
  bundle: string
}
interface Tracking {
  sportName: string
  leagueName: string
  coverageType: string
  trackingName: string
  trackingId: string
}
interface TimeRestrictions {
  embargoDate: string
  expirationDate: string
}
interface DeviceRestrictions {
  type: string
  devices: string[]
}
interface GeoRestrictions {
  type: string
  countries: string[]
}
interface Artwork {
  href: string
}
interface Source {
  mezzanine?: Mezzanine
  flash?: Flash
  hds?: Hds
  HLS?: HLS
  HD?: HD
  full?: Full
  href: string
}
interface Mezzanine {
  href: string
}
interface Flash {
  href: string
}
interface Hds {
  href: string
}
interface HLS {
  href: string
  HD: HD
}
interface HD {
  href: string
}
interface Full {
  href: string
}
interface Alert {
  href: string
}
interface Streaming {
  href: string
}
interface ProgressiveDownload {
  href: string
}
interface PlaysItem {
  id: string
  sequenceNumber: string
  type: Type
  text: string
  awayScore: number
  homeScore: number
  period: Period
  clock: Clock
  scoringPlay: boolean
  scoreValue: number
  team?: Team
  participants?: ParticipantsItem[]
  wallclock: string
  shootingPlay: boolean
  coordinate: Coordinate
}
interface Period {
  number: number
  displayValue: string
}
interface Clock {
  displayValue: string
}
interface ParticipantsItem {
  athlete: Athlete
}
interface Coordinate {
  x: number
  y: number
}
interface Standings {
  fullViewLink?: FullViewLink
  groups?: GroupsItem[]
  entries?: EntriesItem[]
}
interface FullViewLink {
  text: string
  href: string
}
interface GroupsItem {
  standings: Standings
  header: string
  href: string
}
interface EntriesItem {
  team: string
  link: string
  id: string
  uid: string
  stats: StatsItem[]
  logo: LogoItem[]
}
interface StatsItem {
  name: string
  displayName: string
  shortDisplayName: string
  description: string
  abbreviation: string
  type: string
  value: number
  displayValue: string
}
interface LogoItem {
  href: string
  width: number
  height: number
  alt: string
  rel: string[]
  lastUpdated: string
}

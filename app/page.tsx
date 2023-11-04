function getStatsHeaders() {
  const headers = new Headers({
    Host: "stats.nba.com",
    Connection: "keep-alive",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "x-nba-stats-origin": "stats",
    "x-nba-stats-token": "true",
    Referer: "https://stats.nba.com/",
  });
  return headers;
}

async function fetchScoreboard() {
  const res = await fetch(
    "https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json"
  );
  return await res.json();
}

async function fetchLeagueStandings() {
  const res = await fetch(
    "https://stats.nba.com/stats/leaguestandings?LeagueID=00&Season=2019-20&SeasonType=Regular+Season&SeasonYear=",
    {
      headers: getStatsHeaders(),
    }
  );
  return await res.json();
}

export default async function Home() {
  const scoreboardRequest = fetchScoreboard();
  const standingsRequest = fetchLeagueStandings();

  const [scoreboard, standings] = await Promise.all([
    scoreboardRequest,
    standingsRequest,
  ]);

  return (
    <main>
      <div>
        <h1>Test app</h1>
        <pre>{Object.keys(scoreboard).length}</pre>
        <pre>{Object.keys(standings).length}</pre>
      </div>
    </main>
  );
}

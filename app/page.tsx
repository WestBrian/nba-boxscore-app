async function fetchScoreboard() {
  const res = await fetch(
    "https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json"
  );
  return await res.json();
}

async function fetchLeagueStandings() {
  const res = await fetch(
    "https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/seasons/2024/types/2/groups/7/standings/0?lang=en&region=us"
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

  console.log(scoreboard);
  console.log(standings);

  return (
    <main>
      <div>
        <h1>Test app</h1>
        <pre>{JSON.stringify(standings, null, 2)}</pre>
      </div>
    </main>
  );
}

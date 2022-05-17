export type IScoreboard = {
  _internal: {
    pubDateTime: string
    igorPath: string
    routeName: string
    routeValue: string
    xslt: string
    xsltForceRecompile: string
    xsltInCache: string
    xsltCompileTimeMillis: string
    xsltTransformTimeMillis: string
    consolidatedDomKey: string
    endToEndTimeMillis: string
  }
  numGames: number
  games: Array<{
    seasonStageId: number
    seasonYear: string
    leagueName: string
    gameId: string
    arena: {
      name: string
      isDomestic: boolean
      city: string
      stateAbbr: string
      country: string
    }
    isGameActivated: boolean
    statusNum: number
    extendedStatusNum: number
    startTimeEastern: string
    startTimeUTC: string
    endTimeUTC: string
    startDateEastern: string
    homeStartDate: string
    homeStartTime: string
    visitorStartDate: string
    visitorStartTime: string
    gameUrlCode: string
    clock: string
    isBuzzerBeater: boolean
    isPreviewArticleAvail: boolean
    isRecapArticleAvail: boolean
    nugget: {
      text: string
    }
    attendance: string
    tickets: {
      mobileApp: string
      desktopWeb: string
      mobileWeb: string
      leagGameInfo: string
      leagTix: string
    }
    hasGameBookPdf: boolean
    isStartTimeTBD: boolean
    isNeutralVenue: boolean
    gameDuration: {
      hours: string
      minutes: string
    }
    tags: Array<string>
    playoffs: {
      roundNum: string
      confName: string
      seriesId: string
      seriesSummaryText: string
      isSeriesCompleted: boolean
      gameNumInSeries: string
      isIfNecessary: boolean
      vTeam: {
        seedNum: string
        seriesWin: string
        isSeriesWinner: boolean
      }
      hTeam: {
        seedNum: string
        seriesWin: string
        isSeriesWinner: boolean
      }
    }
    period: {
      current: number
      type: number
      maxRegular: number
      isHalftime: boolean
      isEndOfPeriod: boolean
    }
    vTeam: {
      teamId: string
      triCode: string
      win: string
      loss: string
      seriesWin: string
      seriesLoss: string
      score: string
      linescore: Array<{
        score: string
      }>
    }
    hTeam: {
      teamId: string
      triCode: string
      win: string
      loss: string
      seriesWin: string
      seriesLoss: string
      score: string
      linescore: Array<{
        score: string
      }>
    }
    watch: {
      broadcast: {
        broadcasters: {
          national: Array<{
            shortName: string
            longName: string
          }>
          canadian: Array<{
            shortName: string
            longName: string
          }>
          vTeam: Array<any>
          hTeam: Array<any>
          spanish_hTeam: Array<any>
          spanish_vTeam: Array<any>
          spanish_national: Array<any>
        }
        video: {
          regionalBlackoutCodes: string
          canPurchase: boolean
          isLeaguePass: boolean
          isNationalBlackout: boolean
          isTNTOT: boolean
          isVR: boolean
          tntotIsOnAir: boolean
          isNextVR: boolean
          isNBAOnTNTVR: boolean
          isMagicLeap: boolean
          isOculusVenues: boolean
          streams: Array<{
            streamType: string
            isOnAir: boolean
            doesArchiveExist: boolean
            isArchiveAvailToWatch: boolean
            streamId: string
            duration: number
          }>
          deepLink: Array<{
            broadcaster: string
            regionalMarketCodes: string
            iosApp: string
            androidApp: string
            desktopWeb: string
            mobileWeb: string
          }>
        }
        audio: {
          national: {
            streams: Array<{
              language: string
              isOnAir: boolean
              streamId: string
            }>
            broadcasters: Array<any>
          }
          vTeam: {
            streams: Array<{
              language: string
              isOnAir: boolean
              streamId: string
            }>
            broadcasters: Array<{
              shortName: string
              longName: string
            }>
          }
          hTeam: {
            streams: Array<{
              language: string
              isOnAir: boolean
              streamId: string
            }>
            broadcasters: Array<{
              shortName: string
              longName: string
            }>
          }
        }
      }
    }
  }>
}

export type IBoxscore = {
  _internal: {
    pubDateTime: string
    igorPath: string
    routeName: string
    routeValue: string
    xslt: string
    xsltForceRecompile: string
    xsltInCache: string
    xsltCompileTimeMillis: string
    xsltTransformTimeMillis: string
    consolidatedDomKey: string
    endToEndTimeMillis: string
  }
  basicGameData: {
    seasonStageId: number
    seasonYear: string
    leagueName: string
    gameId: string
    arena: {
      name: string
      isDomestic: boolean
      city: string
      stateAbbr: string
      country: string
    }
    isGameActivated: boolean
    statusNum: number
    extendedStatusNum: number
    startTimeEastern: string
    startTimeUTC: string
    endTimeUTC: string
    startDateEastern: string
    homeStartDate: string
    homeStartTime: string
    visitorStartDate: string
    visitorStartTime: string
    gameUrlCode: string
    clock: string
    isBuzzerBeater: boolean
    isPreviewArticleAvail: boolean
    isRecapArticleAvail: boolean
    nugget: {
      text: string
    }
    attendance: string
    tickets: {
      mobileApp: string
      desktopWeb: string
      mobileWeb: string
      leagGameInfo: string
      leagTix: string
    }
    hasGameBookPdf: boolean
    isStartTimeTBD: boolean
    isNeutralVenue: boolean
    gameDuration: {
      hours: string
      minutes: string
    }
    tags: Array<string>
    playoffs: {
      roundNum: string
      confName: string
      seriesId: string
      seriesSummaryText: string
      isSeriesCompleted: boolean
      gameNumInSeries: string
      isIfNecessary: boolean
      vTeam: {
        seedNum: string
        seriesWin: string
        isSeriesWinner: boolean
      }
      hTeam: {
        seedNum: string
        seriesWin: string
        isSeriesWinner: boolean
      }
    }
    period: {
      current: number
      type: number
      maxRegular: number
      isHalftime: boolean
      isEndOfPeriod: boolean
    }
    vTeam: {
      teamId: string
      triCode: string
      win: string
      loss: string
      seriesWin: string
      seriesLoss: string
      score: string
      linescore: Array<{
        score: string
      }>
    }
    hTeam: {
      teamId: string
      triCode: string
      win: string
      loss: string
      seriesWin: string
      seriesLoss: string
      score: string
      linescore: Array<{
        score: string
      }>
    }
    watch: {
      broadcast: {
        broadcasters: {
          national: Array<{
            shortName: string
            longName: string
          }>
          canadian: Array<{
            shortName: string
            longName: string
          }>
          vTeam: Array<any>
          hTeam: Array<any>
          spanish_hTeam: Array<any>
          spanish_vTeam: Array<any>
          spanish_national: Array<any>
        }
        video: {
          regionalBlackoutCodes: string
          canPurchase: boolean
          isLeaguePass: boolean
          isNationalBlackout: boolean
          isTNTOT: boolean
          isVR: boolean
          tntotIsOnAir: boolean
          isNextVR: boolean
          isNBAOnTNTVR: boolean
          isMagicLeap: boolean
          isOculusVenues: boolean
          streams: Array<{
            streamType: string
            isOnAir: boolean
            doesArchiveExist: boolean
            isArchiveAvailToWatch: boolean
            streamId: string
            duration: number
          }>
          deepLink: Array<{
            broadcaster: string
            regionalMarketCodes: string
            iosApp: string
            androidApp: string
            desktopWeb: string
            mobileWeb: string
          }>
        }
        audio: {
          national: {
            streams: Array<{
              language: string
              isOnAir: boolean
              streamId: string
            }>
            broadcasters: Array<any>
          }
          vTeam: {
            streams: Array<{
              language: string
              isOnAir: boolean
              streamId: string
            }>
            broadcasters: Array<{
              shortName: string
              longName: string
            }>
          }
          hTeam: {
            streams: Array<{
              language: string
              isOnAir: boolean
              streamId: string
            }>
            broadcasters: Array<{
              shortName: string
              longName: string
            }>
          }
        }
      }
    }
    officials: {
      formatted: Array<{
        firstNameLastName: string
      }>
    }
  }
  previousMatchup: {
    gameId: string
    gameDate: string
  }
  stats?: {
    timesTied: string
    leadChanges: string
    vTeam: {
      fastBreakPoints: string
      pointsInPaint: string
      biggestLead: string
      secondChancePoints: string
      pointsOffTurnovers: string
      longestRun: string
      totals: {
        points: string
        fgm: string
        fga: string
        fgp: string
        ftm: string
        fta: string
        ftp: string
        tpm: string
        tpa: string
        tpp: string
        offReb: string
        defReb: string
        totReb: string
        assists: string
        pFouls: string
        steals: string
        turnovers: string
        blocks: string
        plusMinus: string
        min: string
        short_timeout_remaining: string
        full_timeout_remaining: string
        team_fouls: string
      }
      leaders: {
        points: {
          value: string
          players: Array<{
            personId: string
            firstName: string
            lastName: string
          }>
        }
        rebounds: {
          value: string
          players: Array<{
            personId: string
            firstName: string
            lastName: string
          }>
        }
        assists: {
          value: string
          players: Array<{
            personId: string
            firstName: string
            lastName: string
          }>
        }
      }
    }
    hTeam: {
      fastBreakPoints: string
      pointsInPaint: string
      biggestLead: string
      secondChancePoints: string
      pointsOffTurnovers: string
      longestRun: string
      totals: {
        points: string
        fgm: string
        fga: string
        fgp: string
        ftm: string
        fta: string
        ftp: string
        tpm: string
        tpa: string
        tpp: string
        offReb: string
        defReb: string
        totReb: string
        assists: string
        pFouls: string
        steals: string
        turnovers: string
        blocks: string
        plusMinus: string
        min: string
        short_timeout_remaining: string
        full_timeout_remaining: string
        team_fouls: string
      }
      leaders: {
        points: {
          value: string
          players: Array<{
            personId: string
            firstName: string
            lastName: string
          }>
        }
        rebounds: {
          value: string
          players: Array<{
            personId: string
            firstName: string
            lastName: string
          }>
        }
        assists: {
          value: string
          players: Array<{
            personId: string
            firstName: string
            lastName: string
          }>
        }
      }
    }
    activePlayers: Array<{
      personId: string
      firstName: string
      lastName: string
      jersey: string
      teamId: string
      isOnCourt: boolean
      points: string
      pos: string
      position_full: string
      player_code: string
      min: string
      fgm: string
      fga: string
      fgp: string
      ftm: string
      fta: string
      ftp: string
      tpm: string
      tpa: string
      tpp: string
      offReb: string
      defReb: string
      totReb: string
      assists: string
      pFouls: string
      steals: string
      turnovers: string
      blocks: string
      plusMinus: string
      dnp: string
      sortKey: {
        name: number
        pos: number
        points: number
        min: number
        fgm: number
        fga: number
        fgp: number
        ftm: number
        fta: number
        ftp: number
        tpm: number
        tpa: number
        tpp: number
        offReb: number
        defReb: number
        totReb: number
        assists: number
        pFouls: number
        steals: number
        turnovers: number
        blocks: number
        plusMinus: number
      }
    }>
  }
}

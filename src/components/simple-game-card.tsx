'use client'

import type { FC } from 'react'
import { nbaTeams } from '@/src/lib/nba-data'
import { motion } from 'framer-motion'

interface TeamRowProps {
  teamName: string
  teamScore: string
}

const TeamRow: FC<TeamRowProps> = ({ teamName, teamScore }) => {
  const team = nbaTeams.find((team) => team.abbreviation === teamName)

  return (
    <div className="flex flex-row justify-between items-center font-semibold">
      <div className="flex flex-row gap-2">
        <div
          className="w-[4px] rounded-full"
          style={{ backgroundColor: team?.colors.at(0) || '#ffffff' }}
        />
        <span>{teamName}</span>
      </div>
      <span>{teamScore}</span>
    </div>
  )
}

export interface SimpleGameCardProps {
  homeTeam: string
  awayTeam: string
  homeScore: string
  awayScore: string
  dateTime: string
  isLive: boolean
  isComplete: boolean
  gameTime: string
  gamePeriod: number
}

export const SimpleGameCard: FC<SimpleGameCardProps> = ({
  gameTime,
  gamePeriod,
  homeTeam,
  homeScore,
  awayTeam,
  awayScore,
  isLive,
  isComplete,
  dateTime,
}) => {
  function gamePeriodToString(period: number) {
    switch (period) {
      case 1:
        return '1st'
      case 2:
        return '2nd'
      case 3:
        return '3rd'
      case 4:
        return '4th'
      case 5:
        return 'OT'
      default:
        return ''
    }
  }

  return (
    <div className="bg-slate-700 rounded-sm text-sm text-white w-[100px] flex flex-col gap-1 p-1 hover:bg-slate-800 cursor-pointer">
      <div className="flex flex-row justify-between items-center">
        <span suppressHydrationWarning>
          {isLive
            ? `${gameTime} ${gamePeriodToString(gamePeriod)}`
            : isComplete
              ? 'Final'
              : dateTime}
        </span>
        {isLive ? (
          <motion.div
            className="w-2 h-2 rounded-full"
            initial={{ backgroundColor: '#EF4444' }}
            animate={{ backgroundColor: '#B91C1C' }}
            transition={{
              repeat: Infinity,
              duration: 1,
              repeatType: 'reverse',
            }}
          />
        ) : (
          <div />
        )}
      </div>
      <TeamRow teamName={homeTeam} teamScore={homeScore} />
      <TeamRow teamName={awayTeam} teamScore={awayScore} />
    </div>
  )
}
